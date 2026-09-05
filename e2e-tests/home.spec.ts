import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle('Tailspin Toys - Crowdfunding your new favorite game!');
  });

  test('should display the main heading', async ({ page }) => {
    // Check that the main page heading is present
    await expect(page.getByRole('heading', { name: 'Welcome to Tailspin Toys', exact: true })).toBeVisible();
  });

  test('should display the site branding in header', async ({ page }) => {
    // Check that the site branding is present in the header (no longer an h1)
    await expect(page.getByText('Tailspin Toys').first()).toBeVisible();
  });

  test('should display the welcome message', async ({ page }) => {
    // Check that the welcome message is present using more specific locator
    await expect(page.getByText('Find your next game! And maybe even back one! Explore our collection!')).toBeVisible();
  });

  test('should filter game cards by title as the user types', async ({ page }) => {
    const searchInput = page.getByRole('searchbox', { name: 'Search games by title' });
    const clearSearchButton = page.getByRole('button', { name: 'Clear game search' });

    await expect(searchInput).toHaveAttribute('placeholder', 'Search games by title...');
    await searchInput.fill('DevOps Dominion');

    await expect(page.getByRole('link', { name: /DevOps Dominion/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Pipeline Conquest/ })).toBeHidden();
    await expect(clearSearchButton).toBeVisible();

    await searchInput.fill('no matching game');
    await expect(page.getByTestId('no-game-results')).toBeVisible();

    await clearSearchButton.click();
    await expect(searchInput).toHaveValue('');
    await expect(page.getByTestId('no-game-results')).toBeHidden();
    await expect(page.getByRole('link', { name: /Pipeline Conquest/ })).toBeVisible();
  });
});
