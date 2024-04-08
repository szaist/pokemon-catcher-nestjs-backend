/*
  Warnings:

  - Added the required column `pokemonId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "pokemonId" INTEGER NOT NULL;
