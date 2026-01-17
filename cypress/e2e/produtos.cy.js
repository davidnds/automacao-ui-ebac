///<reference types="cypress"/>

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        cy.visit('catalog.html')
    });

    it('Deve exibir o título da página', () => {
        cy.contains('Conheça Nosso Acervo').should('be.visible')
    })

    it('Deve permitir digitar na pesquisa', () => {
        cy.get('input[placeholder*="Buscar"]').type('1984').should('have.value', '1984')
    })

    it('Deve clicar em todos os botões adicionar a cesta', () => {
        cy.get('.btn-primary').click({ multiple: true })
        cy.get('#cart-count').should('contain', '12')
    });

    it('Deve clicar no primeiro botão Adicionar a cesta', () => {
        cy.get('.btn-primary').first().click()
        cy.get('#cart-count').should('contain', '1')
    });

    it('Deve clicar no ultimo botão Adicionar a cesta', () => {
        cy.get('.btn-primary').last().click()
        cy.get('#cart-count').should('contain', '1')
    });

    it('Deve clicar no terceiro botão Adicionar a cesta', () => {
        cy.get('.btn-primary').eq(2).click()
        cy.get('#cart-count').should('contain', '1')
    });

    it('Deve clicar no quinto botão Adicionar a cesta', () => {
        cy.get('.btn-primary').eq(4).click()
        //Resultado esperado
        cy.get('#global-alert-container').should('be.visible').and('contain', 'A Metamorfose')
        cy.get('#cart-count').should('contain', '1')
    });

    it('Deve clicar no nome do livro e direcionar para a tela do livro', () => {
        cy.contains('Dom Casmurro').click()
        cy.url().should('include', 'book-details')
        cy.get('#add-to-cart-btn').click()
        cy.get('#alert-container').should('contain', 'Livro adicionado à cesta com sucesso!')
    });

    it('Deve exibir as capas dos livros', () => {
        cy.get('.card').should('have.length.greaterThan', 0)
    })

});
