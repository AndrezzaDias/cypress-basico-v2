/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function (){
        cy.visit('./src/index.html')   
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencher os campos obrigatorios', () =>{
        cy.clock()
        const longText = Cypress._.repeat('abcdefghijlmnopqrstuvzx', 10)
        cy.get('#firstName').type('Andreza')
        cy.get('#lastName').type('Dias')
        cy.get('#email').type('andreza.dias18@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('.button[type="submit"]').click()

        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
        cy.clock()
        cy.get('#firstName').type('Andreza')
        cy.get('#lastName').type('Dias')
        cy.get('#email').type('andreza.dias18hotmail.com')
        cy.get('#open-text-area').type('testesS')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })
    it('campo de telefone só aceita números', () =>{
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')

    })
    Cypress._.times(3, () => {
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
            cy.clock()
            cy.get('#firstName').type('Andreza')
            cy.get('#lastName').type('Dias')
            cy.get('#email').type('andreza.dias18@hotmail.com')
            cy.get('#phone-checkbox').check()
            cy.get('#open-text-area').type('testesS')
            cy.get('.button[type="submit"]').click()
            
            cy.get('.error').should('be.visible')
            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
        })

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
        cy.get('#firstName')
            .type('Andreza')
            .should('have.value', 'Andreza')
            .clear()
            .should('have.value','')
        
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto' , ()=>{
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu texto', () =>{
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu texto', () =>{
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')

    })
    it('marca o tipo de atendimento "Feedback', ()=>{
       cy.get('input[type="radio"]') 
        .each(type0Service =>{
            cy.wrap(type0Service)
                .check()
                .should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', () =>{
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', () =>{
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
                .should( (input ) =>{
                    expect(input[0].files[0].name).to.equal('example.json')
                })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () =>{
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
                .should( (input ) =>{
                    expect(input[0].files[0].name).to.equal('example.json')
                })

    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
                .should( (input ) =>{
                    expect(input[0].files[0].name).to.equal('example.json')
                })
        
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
        cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
        cy.contains('a', 'Política de Privacidade')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('h1', 'CAC TAT - Política de privacidade').should('be.visible')  
    }) 
    it('Desafio (encontre o gato)', () =>{
        cy.get('div#white-background span#cat')
        .should('exist')
        .and('not.be.visible');
    }) 

    it('Desafio (encontre o gato)', () =>{
        cy.get('div#white-background span#cat')
        .invoke('show')
        .should('be.visible')
        .invoke('hide')
        .should('not.be.visible')

    }) 
    

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
      it('preenche o campo da área de texto usando o comando invoke', () => {
        cy.get('#open-text-area').invoke('val', 'um texto qualquer').should('have.value', 'um texto qualquer')
      })
      it('faz uma requisição HTTP', () =>{
        cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('getResquest')
        
        .its('status')
        .should('be.equal', 200)

        cy.get('@getResquest')
        .its('statusText')
        .should('be.equal', 'OK')

        cy.get('@getResquest')
        .its('body')
        .should('include','CAC TAT')

      })
      



  })
  