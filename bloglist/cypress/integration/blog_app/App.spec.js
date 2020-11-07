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

        describe('and there\'s a blog in the blogs list...', () => {
            beforeEach(() => {
                cy.addBlog(testBlog);
            });

            it('the user can like it', () => {
                cy.contains('Show details').click();
                cy.get('.blog__like-btn').click();
                cy.get('.blog__likes').contains(testBlog.likes + 1);
            });

            it('the user can delete it', () => {
                cy.contains('Show details').click();
                cy.get('.blog__deletion-btn').click();
                cy.get('.blogs-list').should('be.empty');
            });

            it('a user other than the creator cannot delete it', () => {
                const wrongUser = { ...testUser, username: 'wrong_user' };
                cy.request('POST', 'http://localhost:3001/api/users', wrongUser);
                cy.request('POST', 'http://localhost:3001/api/login', wrongUser)
                    .then(response => {
                        localStorage.setItem('user', JSON.stringify(response.body));
                        cy.visit('http://localhost:3000');
                        cy.contains('Show details').click();
                        cy.get('.blog__deletion-btn').should('not.be.visible');
                    });
            });
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