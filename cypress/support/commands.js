Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'https://konnect.konghq.com/api/auth',
        form: true,
        followRedirect: true,
        body: {
            'username': username,
            'password': password,
        },
    });
})

Cypress.Commands.add('loginUI', (userEmail, password) => {
    cy.visit('/')
    cy.get('input#email').type(userEmail)
    cy.get('input#password').type(password)
    cy.get('.login-button').click()
    cy.url().should('eq',`https://konnect.konghq.com/servicehub`)
})

Cypress.Commands.add('deleteService', (id) => {
    cy.request({
        method: 'DELETE',
        url: `https://konnect.konghq.com/api/service_packages/${id}`,
    });
})
