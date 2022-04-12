// Basic actions:
// - Authenticate and access ServiceHub
// - Complete the flow to create a new Service
// - Create any additional entities associated with a Service

describe('Authenticate and access Service Hub', () => {
    const randomId = () => Cypress._.random(0, 1e6)
    const id = randomId()
    let serviceName = `qa_service_name_${id}`
    let serviceVersion = `qa_version_${id}`
    let serviceUrl = ''

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
    

    beforeEach(() => {
        cy.loginUI(Cypress.env('username'), Cypress.env('password'))
    })

    after(() => {
        cy.url().then(url => {
            let urlArray = url.split('/')
            let service_id = urlArray[4]
            cy.log(service_id)
            cy.deleteService(service_id)
            // Use to Verify succesful deletion
            // cy.visit(url)
            // cy.url().should('eq', 'https://konnect.konghq.com/404')
        })
    })

    it('can create a new Service and Implementation', () => {
        cy.visit('https://konnect.konghq.com/servicehub')
        cy.get('[data-tourid="create-service-btn"]').click()
        cy.get('input#name').type(serviceName)
        cy.get('input#version').type(serviceVersion)   
        cy.get('button[type="submit"]').click()  
        cy.get('.toaster-item .k-alert.success').should('be.visible')
        cy.get('[data-testid="packageName"]').should('include.text', serviceName)
    })

    it('can create New Implementation', () => {
        cy.get(`[data-testid="${serviceName}"]`).click()
        cy.get('[mapname="Service Versions"]').click()

        cy.get(`[data-testid="${serviceVersion}"] > :nth-child(1)`).click()
        cy.get('[data-testid="empty-state-card"] a').click()

        cy.get('input#url').type(`http://qa-automation.com/${id}`)
        cy.get('[data-testid="stepper-next"][type="button"]').click()

        cy.get('input#name').type(`qa_route${id}`)
        cy.get('input#hosts').type(`qa_host${id}`)
        cy.get('input#methods').type('GET')

        cy.get('[data-testid="complete-stepper"][type="button"]').click()
        cy.get('.toaster-item .k-alert.success').should('be.visible')
        cy.get('[data-testid="upstream-url"]').should('contain.text', 'Upstream URL:  http://qa-automation.com Copy to clipboard')
        
        cy.visit('https://konnect.konghq.com/servicehub')
        cy.get(`[data-testid="${serviceName}"]`).click()
        cy.get('[data-testid="packageName"]').should('be.visible')
    })

    // Skipping due to flakiness of menu-button
    // it.skip('can enable App Registration', () => {
    //     cy.get(`[data-testid="${serviceName}"]`).click()
    //     cy.get('button[data-testid="service-package-actions"]').click()
    //     cy.get('[data-testid="enable-app-reg"]').should('be.visible').click()
    //     cy.get('#enable-app-registration').should('be.visible')
    //     cy.get('[data-testid="app-reg-auto-approve-toggle"][type="checkbox"]').check()
    //     cy.get('button[form="enable-app-registration"]').click()
    //     cy.get('[data-testid="registration-status-badge"]').should('be.visible')
    // })
})

