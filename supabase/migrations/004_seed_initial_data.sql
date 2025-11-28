-- Create seed data for medicines (based on mocks)
INSERT INTO medicines (name, dosage, form, description, indications, contraindications, side_effects, manufacturer, availability, price)
VALUES
  (
    'Paracétamol',
    '500mg',
    'Comprimé',
    'Antalgique et antipyrétique utilisé pour soulager la douleur et faire baisser la fièvre.',
    '{"Fièvre", "Douleurs légères à modérées", "Céphalées"}',
    '{"Insuffisance hépatique sévère", "Allergie au paracétamol"}',
    '{"Nausées", "Éruption cutanée"}',
    'Sanofi',
    'in_stock',
    500.00
  ),
  (
    'Ibuprofène',
    '400mg',
    'Comprimé',
    'Anti-inflammatoire non stéroïdien utilisé contre la douleur et l''inflammation.',
    '{"Céphalées", "Douleurs musculaires", "Inflammations"}',
    '{"Ulcère gastrique", "Grossesse 3e trimestre", "Allergie AINS"}',
    '{"Douleurs abdominales", "Vertiges"}',
    'GSK',
    'low_stock',
    1200.00
  ),
  (
    'Amoxicilline',
    '1g',
    'Comprimé',
    'Antibiotique de la famille des pénicillines utilisé pour traiter diverses infections.',
    '{"Infections respiratoires", "Infections ORL", "Infections urinaires"}',
    '{"Allergie aux pénicillines"}',
    '{"Diarrhée", "Éruptions cutanées"}',
    'Sandoz',
    'out_of_stock',
    2500.00
  ),
  (
    'Doliprane',
    '1000mg',
    'Comprimé',
    'Antalgique très utilisé pour la fièvre et les douleurs.',
    '{"Fièvre", "Douleurs musculaires"}',
    '{"Maladie du foie"}',
    '{"Allergies cutanées"}',
    'Sanofi',
    'in_stock',
    800.00
  ),
  (
    'Metformine',
    '850mg',
    'Comprimé',
    'Médicament antidiabétique diminuant la production de glucose par le foie.',
    '{"Diabète de type 2"}',
    '{"Insuffisance rénale sévère"}',
    '{"Troubles digestifs"}',
    'Merck',
    'in_stock',
    1200.00
  );

-- Create seed data for pharmacies (based on mocks)
INSERT INTO pharmacies (id, name, location, city, phone, email, address, opening_hours, latitude, longitude, image, description)
VALUES
  (
    'pharm-001',
    'Pharmacie Central',
    'Plateau',
    'Abidjan',
    '+225 22 44 55 66',
    'contact@pharmaciecentral.ci',
    'Avenue Marchand, Plateau',
    '08:00 - 22:00',
    5.3364,
    -4.0383,
    '/images/pharmacy-central.jpg',
    'Pharmacie principale avec large sélection de médicaments et services de consultation'
  ),
  (
    'pharm-002',
    'Pharmacie Santé Plus',
    'Cocody',
    'Abidjan',
    '+225 22 77 88 99',
    'sante@santeplusci.ci',
    'Boulevard de la Paix, Cocody',
    '07:00 - 23:00',
    5.3516,
    -4.0021,
    '/images/pharmacy-sante.jpg',
    'Pharmacie spécialisée avec équipe de pharmaciens expérimentés'
  ),
  (
    'pharm-003',
    'Pharmacie Étoile',
    'Riviera',
    'Abidjan',
    '+225 22 11 22 33',
    'info@pharmacieetoile.ci',
    'Rue du Commerce, Riviera',
    '06:00 - 21:00',
    5.3741,
    -4.0144,
    '/images/pharmacy-etoile.jpg',
    'Pharmacie de proximité avec service de livraison à domicile'
  );
