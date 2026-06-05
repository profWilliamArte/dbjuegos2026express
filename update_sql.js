import fs from 'fs';
let content = fs.readFileSync('e:/documentos/2026/cursocullstackjs2026Practica/m5/c3/data/dbjuegos.sql', 'utf8');

content = content.replace(/`idestatus` int NOT NULL/g, '`id` int NOT NULL');
content = content.replace(/`idestatus` int DEFAULT NULL/g, '`estatus_id` int DEFAULT NULL');
content = content.replace(/`idgenero` int NOT NULL/g, '`id` int NOT NULL');
content = content.replace(/`idjuego` int NOT NULL/g, '`id` int NOT NULL');
content = content.replace(/`idplataforma` int NOT NULL/g, '`id` int NOT NULL');
content = content.replace(/`idjuego_plataforma` int UNSIGNED NOT NULL/g, '`id` int UNSIGNED NOT NULL');
content = content.replace(/`idestatus` int/g, '`estatus_id` int');
content = content.replace(/`idgenero` int/g, '`genero_id` int');
content = content.replace(/`idjuego` int/g, '`juego_id` int');
content = content.replace(/`idplataforma` int/g, '`plataforma_id` int');

content = content.replace(/\(`idestatus`, `nombre`\)/g, '(`id`, `nombre`)');
content = content.replace(/\(`idgenero`, `idestatus`, `nombre`, `descripcion`\)/g, '(`id`, `estatus_id`, `nombre`, `descripcion`)');
content = content.replace(/\(`idjuego`, `idestatus`, `idgenero`, `nombre`, `descripcion`, `fechapublicacion`, `precio`, `valoracion`, `imagen`\)/g, '(`id`, `estatus_id`, `genero_id`, `nombre`, `descripcion`, `fechapublicacion`, `precio`, `valoracion`, `imagen`)');
content = content.replace(/\(`idjuego_plataforma`, `idjuego`, `idplataforma`\)/g, '(`id`, `juego_id`, `plataforma_id`)');
content = content.replace(/\(`idplataforma`, `idestatus`, `nombre`, `descripcion`\)/g, '(`id`, `estatus_id`, `nombre`, `descripcion`)');

content = content.replace(/PRIMARY KEY \(`idestatus`\)/g, 'PRIMARY KEY (`id`)');
content = content.replace(/PRIMARY KEY \(`idgenero`\)/g, 'PRIMARY KEY (`id`)');
content = content.replace(/PRIMARY KEY \(`idjuego`\)/g, 'PRIMARY KEY (`id`)');
content = content.replace(/PRIMARY KEY \(`idjuego_plataforma`\)/g, 'PRIMARY KEY (`id`)');
content = content.replace(/PRIMARY KEY \(`idplataforma`\)/g, 'PRIMARY KEY (`id`)');

content = content.replace(/MODIFY `idestatus` int NOT NULL AUTO_INCREMENT/g, 'MODIFY `id` int NOT NULL AUTO_INCREMENT');
content = content.replace(/MODIFY `idgenero` int NOT NULL AUTO_INCREMENT/g, 'MODIFY `id` int NOT NULL AUTO_INCREMENT');
content = content.replace(/MODIFY `idjuego` int NOT NULL AUTO_INCREMENT/g, 'MODIFY `id` int NOT NULL AUTO_INCREMENT');
content = content.replace(/MODIFY `idjuego_plataforma` int UNSIGNED NOT NULL AUTO_INCREMENT/g, 'MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT');
content = content.replace(/MODIFY `idplataforma` int NOT NULL AUTO_INCREMENT/g, 'MODIFY `id` int NOT NULL AUTO_INCREMENT');

const constraints = `
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla \`generos\`
--
ALTER TABLE \`generos\`
  ADD CONSTRAINT \`fk_genero_estatus\` FOREIGN KEY (\`estatus_id\`) REFERENCES \`estatus\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla \`juegos\`
--
ALTER TABLE \`juegos\`
  ADD CONSTRAINT \`fk_juego_estatus\` FOREIGN KEY (\`estatus_id\`) REFERENCES \`estatus\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT \`fk_juego_genero\` FOREIGN KEY (\`genero_id\`) REFERENCES \`generos\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla \`juegos_plataformas\`
--
ALTER TABLE \`juegos_plataformas\`
  ADD CONSTRAINT \`fk_jp_juego\` FOREIGN KEY (\`juego_id\`) REFERENCES \`juegos\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT \`fk_jp_plataforma\` FOREIGN KEY (\`plataforma_id\`) REFERENCES \`plataformas\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla \`plataformas\`
--
ALTER TABLE \`plataformas\`
  ADD CONSTRAINT \`fk_plataforma_estatus\` FOREIGN KEY (\`estatus_id\`) REFERENCES \`estatus\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE;
`;

content = content.replace('COMMIT;', constraints + '\nCOMMIT;');

fs.writeFileSync('e:/documentos/2026/cursocullstackjs2026Practica/m5/c3/data/dbjuegos.sql', content, 'utf8');
console.log('SQL file updated successfully.');
