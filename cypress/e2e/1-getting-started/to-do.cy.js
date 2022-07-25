/// <reference types="cypress" />

describe('to-do app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
  
    it('verificar se existe dois itens por padrão', () => {
      cy.get('.todo-list li').should('have.length', 2)
      cy.get('.todo-list li').first().should('have.text', 'Tomar café da manhã')
      cy.get('.todo-list li').last().should('have.text', 'Passear com o cachorro')
    })
  
    it('adicionar novo item', () => {
      const newItem = 'Estudar testes e2e'
  
      cy.get('[data-cy="new-task"]').type(`${newItem}`)
      cy.get('[data-testid=add-task-button]').click()
      cy.get('.todo-list li')
        .should('have.length', 3)
        .last()
        .should('have.text', newItem)
    })

    it('tentar incluir tarefa sem texto', () => {
        cy.get('[data-testid=add-task-button]').click()
        cy.get('.todo-list li').should('have.length', 2)
        cy.get('.input-error p').should('have.text', 'Não há tarefa para incluir!')
    })
  
    it('poder checar o item concluído', () => {

      cy.contains('Tomar café da manhã')
        .parent()
        .find('[data-testid=task-check]')
        .click({force: true})

      cy.contains('Tomar café da manhã')
        .parents('li div')
        .should('have.class', 'completed')
    })
  
    context('com a task concluída', () => {
      beforeEach(() => {
        cy.contains('Tomar café da manhã')
          .parents('li div')
          .find('[data-testid=task-check]')
          .click({force: true})
      })
  
      it('poder deletar a task ', () => {
        cy.contains('Tomar café da manhã')
        .parents('li')
        .find('[data-testid=remove-task-button]')
        .click()
        cy.get('.todo-list li')
          .should('have.length', 1)
          .should('not.have.text', 'Tomar café da manhã')
      })
    })
  })
  