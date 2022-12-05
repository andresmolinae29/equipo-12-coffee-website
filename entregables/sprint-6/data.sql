USE db_coffee;

DELETE FROM products;

SELECT * FROM products;

INSERT INTO products 
	(
    name,
    description,
    size,
    price,
    category,
    img,
    longDescription,
    discount,
    sellingCategory
    )
VALUES
    ('17ft Ceiling Espresso','Caramelo, almendra, cereza seca','12oz',21.0,'espresso','img-ceiling-espresso.jpg','Café orgánico de alta calidad para hacer un espresso fuerte, con mucha crema y sin pretensiones',0,'new'),
    ('Dandy Espresso','Zesty, eloquent, refreshing','6oz',13.5,'espresso','img-dandy-espresso.jpg','Café con una base consistente de café colombiano, esta mezcla es delicada, refrescante y exuberante, como un día soleado, o una fiesta en la playa',0,'new'),
    ('Hayes Valley Espresso','Sabroso, elocuente, refrescante.','12oz',21.0,'espresso','img-default.jpg','Café de tono más bajo y mínimamente brillante, Hayes Valley Espresso ofrece un trago directo con una voluptuosa crema rojiza y una viscosidad de aspecto un tanto peligroso. La leche, en cualquier cantidad, agrega romance a los aspectos melancólicos del café, resaltando el chocolate inherente y agregando un toque suave y redondeado.',0.1,'sale'),
    ('Opascope Espresso','Jugoso, vibrante, limpio','12oz',23.0,'espresso','img-opascope-espresso.jpg','Opascope Espresso es una adición refrescante a una línea que alguna vez estuvo dominada por selecciones densas y chocolatadas. Produce un trago efervescente, repleto de rayas de tropicalia.',0,'new'),
    ('Costa Rica Rivense H17 Natural','Fresa deshidratada, azúcar moreno, pomelo','6oz',29.0,'single origin','img-costa-origin.jpg','Café naturalmente este lote permitiendo que las cualidades genéticas brillen en su perfil de sabor',0,'sale'),
    ('Costa Rica La Lia Gesha Ethiopia Black Honey','Compota de cereza, rosa, ciruela','6oz',27.0,'single origin','img-lalia-espresso.jpg','Este café tiene una profundidad de complejidad, en parte debido a su procesamiento intrincado e inusual, pero también por los destellos de Gesha mezclados en el lote. Por sí solo, Gesha exuda aromas florales; mezclado con variedades tradicionales de Etiopía, como se ve aquí, el aroma se respira como un ramo completo terminado con rosas. Para el gusto, una mermelada dulce tiene capas de cítricos y frutas de hueso, bien equilibradas y brillantes.',0,'sale'),
    ('Burundi Kayanza Heza Natural','Mora, hierba de limón, pasas doradas','6oz',27.0,'single origin','img-burundi-espresso.jpg','Los cafés naturales de Heza son frutales y mermelada como cabría esperar de este método de procesamiento, al tiempo que mantienen una cantidad inusualmente alta de su carácter y complejidad inherentes.',0,'new'),
    ('Bella Donova','Frambuesa, chocolate, melaza','12oz',21.0,'blend','img-bella-espresso.jpg','Nuestra mezcla más popular, Bella, es una variación de la combinación arquetípica Moka-Java, en la que los granos de café etíope naturales silvestres y mermelado encuentran el equilibrio con cafés más sustantivos de Sumatra y Perú. Se encuentra en el lado más oscuro de las cosas, resiste bien los rigores de la máquina automática de goteo y resiste la leche o la crema, aunque es igual de elegante en negro.',0,'new'),
    ('New Orleans Style Coffee and Chicory','El café y la achicoria molida que necesitas para hacer nuestra NOLA en casa','12oz',21.0,'blend','img-orleans-espresso.jpg','Para hacer nuestra NOLA en casa, ofrecemos nuestra mezcla de café al estilo de Nueva Orleans y achicoria molida en grano entero, y una receta para comenzar. Solo agregas la leche, el azúcar, el hielo y un poco de tiempo.',0.2,'sale'),
    ('Night Light Decaf','Crema brule, vainilla, lima','6oz',13.5,'blend','img-night-espresso.jpg','Dulce y gratificante, está descafeinado con el alucinante Swiss Water Process libre de químicos. Sorprendentemente versátil, este descafeinado funciona bien en casi todos los métodos de preparación, desde espresso hasta vertido; nuestro equipo de café lo describe como cremoso y versátil con ricos matices de malta.',0.2,'sale');
    
