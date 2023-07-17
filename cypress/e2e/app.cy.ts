describe('Ticket Management System', 
{
  viewportHeight: 1536,
  viewportWidth: 960,
},
() => {
  
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('should display the ticket list', () => {
    // Ensure the ticket list element exists
    cy.get('[data-cy="ticket-list"]').should('exist');
  });

  it('should open the create ticket modal', () => {
    // Click the create ticket button
    cy.wait(1000);
    cy.get('[data-cy="create-ticket-button"]').click();

    // Ensure the create ticket modal is visible
    cy.wait(1500);
    cy.get('[data-cy="create-ticket-modal"]').should('be.visible');
  });

  it('should create a new ticket', () => {
    const client = 'John Doe';
    const issue = 'Bug Fix';
    const deadline = '2023-07-21';

    // Click the create ticket button
    cy.get('[data-cy="create-ticket-button"]').click();

    // Fill in the ticket details in the create ticket modal
    cy.get('[data-cy="create-ticket-modal"]').within(() => {
      cy.get('[data-cy="client"] input').type(client);
      cy.get('[data-cy="issue"]').type(issue);
      cy.get('[data-cy="deadline"]').type(deadline);
      cy.get('[data-cy="create-ticket-submit"]').click();
    });

    // Assert that the new ticket is added to the ticket list
    cy.get('[data-cy="ticket-list"]').should('contain', client);
    cy.get('[data-cy="ticket-list"]').should('contain', issue);
  });

});