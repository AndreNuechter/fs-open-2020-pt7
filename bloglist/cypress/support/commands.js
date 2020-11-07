Cypress.Commands.add('login', (user) => {
    cy.request('POST', 'http://localhost:3001/api/login', user)
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.body));
            cy.visit('http://localhost:3000');
        });
});

Cypress.Commands.add('addBlog', (blog) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        auth: {
            bearer: JSON.parse(localStorage.getItem('user')).token
        },
        body: blog
    });
    cy.visit('http://localhost:3000');
});