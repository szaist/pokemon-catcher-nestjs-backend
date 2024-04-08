/*
  Warnings:

  - You are about to drop the `PokemonUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `height` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PokemonUser" DROP CONSTRAINT "PokemonUser_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonUser" DROP CONSTRAINT "PokemonUser_userId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "abilities" TEXT[],
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "PokemonUser";

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
