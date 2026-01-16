///<reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro no hub de leitura', () => {

    beforeEach('', () => {
        cy.visit('register.html')
    });

    it('Deve fazer cadastro com sucesso', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });

    it('Deve validar mensagem de erro ao enviar sem preencher email', () => {
        let nome = faker.person.fullName()
        cy.get('#name').type(nome)
        cy.get('#email').clear()
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.get('#register-form > :nth-child(2) > .invalid-feedback').should('contain', 'Email válido é obrigatório')
    })

    it('Deve validar mensagem de erro ao enviar sem preencher nome', () => {
        let email = faker.internet.email()
        cy.get('#name').clear()
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });

    it('validar mensagem de erro ao enviar sem confirmar a senha', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').clear()
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.get(':nth-child(5) > .invalid-feedback').should('contain', 'Senhas não coincidem')
    });

    it('Deve validar mensagem de erro todos os campos vazios', () => {
        cy.get('#name').clear()
        cy.get('#email').clear()
        cy.get('#phone').clear()
        cy.get('#password').clear()
        cy.get('#confirm-password').clear()
        //cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.get('#register-form > :nth-child(2) > .invalid-feedback').should('contain', 'Email válido é obrigatório')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
        cy.get('#password').should('have.class', 'is-invalid')
        cy.get('#terms-agreement').should('have.class', 'is-invalid')
        cy.get('.invalid-feedback').should('be.visible').and('contain', 'aceitar os termos')
    });

})