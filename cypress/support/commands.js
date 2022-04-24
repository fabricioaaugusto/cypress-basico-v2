Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Fabricio')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('fabricioaaugusto@gmail.com')
    cy.get('#phone').type('19982219067')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    //cy.get('button[type="submit"]').click()
})