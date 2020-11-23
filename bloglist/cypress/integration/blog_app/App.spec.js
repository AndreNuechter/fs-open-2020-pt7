const testUser = { username: 'testing', password: '123abc' };
const testBlog = { title: 'title', author: 'author', likes: 42, url: 'www.test.io/url' };

describe('Blog app...', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        cy.request('POST', 'http://localhost:3001/api/users', testUser);
        cy.visit('http://localhost:3000');
    });

    it('shows login form initially', function() {
        cy.get('.login-form');
        cy.contains('Login');
    });

    it('displays an error message for a faulty login that disappears after 5 seconds', function() {
        cy.get('[name="username"]').type('foo');
        cy.get('[name="password"]').type('bar{enter}');
        cy.get('.error').should('have.css', 'background-color', 'rgba(255, 0, 0, 0.8)');
        cy.get('.error', { timeout: 5000 }).should('not.be.visible');
    });

    it('displays a success message for a correct login', function() {
        cy.get('[name="username"]').type(testUser.username);
        cy.get('[name="password"]').type(`${testUser.password}{enter}`);
        cy.get('.success');
    });

    describe('When logged in...', () => {
        beforeEach(() => {
            cy.login(testUser);
        });

        it('the login form is not visible', () => {
            cy.get('.login-form').should('not.be.visible');
        });

        it('the blogs list is visible', () => {
            cy.get('.blogs-list');
        });

        it('the user can create a new blog, that is added to the blogs list', () => {
            cy.contains('Create Blog').click();
            cy.get('.blog-creation-form');
            Object.keys(testBlog).forEach(key => {
                cy.get(`[name="${key}"]`).type(testBlog[key]);
            });
            cy.get('.blog-creation-form__submit-btn').click();
            cy.get('.blog-creation-form').should('not.be.visible');
            cy.get('.blogs-list').children().contains(testBlog.title);
        });

        describe('and there\'re multiple blogs...', () => {
            beforeEach(() => {
                cy.addBlog(testBlog);
                cy.addBlog(Object.assign({}, testBlog, { likes: testBlog.likes + 1 }));
                cy.addBlog(Object.assign({}, testBlog, { likes: testBlog.likes + 2 }));
            });

            it('they\'re ordered based on the number of their likes', () => {
                cy.get('.blogs-list').children();
                cy.get('.blogs-list')
                    .then((list) => {
                        const likes = [...list[0].children].map(c => +c.dataset.likes);
                        expect(likes).to.eql(likes.slice().sort((a, b) => b - a));
                    });
            });
        });
    });
});