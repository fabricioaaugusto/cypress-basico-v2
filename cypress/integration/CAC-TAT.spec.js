/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulario', function() {
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
        cy.get('#firstName').type('Fabricio')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('fabricioaaugusto@gmail.com')
        cy.get('#phone').type('19982219067')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        //cy.get('button[type="submit"]').click()    
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulario com um email com formatação', function(){
        cy.get('#firstName').type('Fabricio')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('fabricioaaugusto')
        cy.get('#phone').type('19982219067')
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', function(){
        cy.get('#phone')
            .type('asbasbsabsa')
            .should('have.value', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido ante do envio', function(){
        cy.get('#firstName').type('Fabricio')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('fabricioaaugusto@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Fabricio')
            .should('have.value', 'Fabricio')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Oliveira')
            .should('have.value', 'Oliveira')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('fabricioaaugusto@gmail.com')
            .should('have.value', 'fabricioaaugusto@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('19982219067')
            .should('have.value', '19982219067')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function(){
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu texto', function(){
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback" ', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    
    it('seleciona um arquivo da pasta fixture', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a pagina da politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})   