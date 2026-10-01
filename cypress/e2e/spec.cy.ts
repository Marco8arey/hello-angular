describe('MyCV E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the CV layout table', () => {
    cy.get('table').should('have.length.at.least', 1);
  });

  it('shows the header name loaded from Firestore', () => {
    cy.contains('Marco Antonio Ochoa Reyes', { timeout: 15000 }).should('be.visible');
  });

  it('shows the work experience section', () => {
    cy.contains('Logros:', { timeout: 15000 }).should('exist');
  });

  it('shows the skills section', () => {
    cy.contains('Backend:', { timeout: 15000 }).should('exist');
  });

  it('shows the languages section', () => {
    cy.contains('Aprendido:', { timeout: 15000 }).should('exist');
  });

  it('shows the interests section', () => {
    cy.contains('Arte:', { timeout: 15000 }).should('exist');
  });
});
