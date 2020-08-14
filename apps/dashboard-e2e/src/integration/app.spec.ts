describe('dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.contains('Default Branches');
  });
});
