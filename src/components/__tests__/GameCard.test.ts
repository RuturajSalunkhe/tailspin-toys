import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const gameCardSource: string = readFileSync(
    resolve(process.cwd(), 'src/components/GameCard.astro'),
    'utf8',
);

describe('GameCard rating rendering', () => {
    it('renders the StarRating component when starRating is provided', () => {
        expect(gameCardSource).toMatch(
            /\{game\.starRating !== null \? \(\s*<StarRating rating=\{game\.starRating\} \/>\s*\)/s,
        );
    });

    it("renders 'No rating yet' when starRating is null", () => {
        expect(gameCardSource).toMatch(
            /:\s*\(\s*<span[^>]*data-testid="game-rating"[^>]*>No rating yet<\/span>\s*\)/s,
        );
    });
});
