///<reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('login.html')
    });

    it('Deve realizar o login de USUARIO com sucesso', () => {
        cy.get('#email').type('usuario@teste.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
    });

    it('Deve realizar o login de ADMINISTRADOR com sucesso', () => {
        cy.get('#email').type('admin@biblioteca.com')
        cy.get('#password').type('admin123')
        cy.get('#login-btn').click()
        //Resultado esperado
        cy.url().should('include', 'admin-dashboard')
    });

    it('Deve retornar mensagem de erro ao tentar login sem email', () => {
        cy.get('#email').clear()
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()
        //Resultado esperado
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Por favor, insira um email válido.')
    });

    it('Deve retornar mensagem de erro ao tentar login sem senha', () => {
        cy.get('#email').type('usuario@teste.com')
        cy.get('#password').clear()
        cy.get('#login-btn').click()
        //Resultado esperado
        cy.get('#password').should('have.class', 'is-invalid')
    });

    it('Deve retornar mensagem de erro ao tentar login com senha e email sem conta registrada', () => {
        let senha = faker.internet.password()
        let email = faker.internet.email()
        cy.get('#email').type(email)
        cy.get('#password').type(senha)
        cy.get('#login-btn').click()
        //Resultado esperado
        cy.get('#alert-container').should('contain', ' Email ou senha incorretos.')
    });

});