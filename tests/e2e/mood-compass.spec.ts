import { expect, test } from "@playwright/test";

test("first check-in", async ({ page }) => {
  await page.goto("/app/check-in");
  await page.getByRole("button", { name: /Good\. Pleasantness 8, energy 7/i }).click();
  await page.getByRole("button", { name: "Save check-in" }).click();
  await expect(page.getByText("Saved. Your dashboard is updated.")).toBeVisible();
});

test("returning user dashboard", async ({ page }) => {
  await page.goto("/app");
  await expect(page.getByRole("heading", { name: "A calm overview" })).toBeVisible();
});

test("not-enough-data forecast", async ({ page }) => {
  await page.goto("/app/insights");
  await expect(page.getByText("Not enough history yet for a personal forecast.")).toBeVisible();
});

test("export and delete settings", async ({ page }) => {
  await page.goto("/app/settings");
  await expect(page.getByRole("button", { name: "Export data" })).toBeVisible();
  await page.getByRole("button", { name: "Delete all data" }).click();
});
