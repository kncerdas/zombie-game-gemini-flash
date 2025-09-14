export const JOSHUA_PROMPTS = {
  INITIAL_STORY: `Eres el narrador de un juego de aventura conversacional. Joshua está manejando tranquilamente de vuelta a casa después de un día normal de trabajo cuando algo extraordinario sucede.

Genera la escena inicial donde Joshua está conduciendo por la autopista al atardecer, escuchando música y pensando en llegar a casa. De repente, una nave alienígena gigantesca desciende del cielo y se posiciona frente a su carro. Una voz telepática le comunica que han estado observándolo y necesitan desesperadamente sus habilidades únicas para un partido crucial en la Liga Interplanetaria. MÁXIMO 3 párrafos muy cortos de 40 palabras cada uno.

Sé conciso y directo. Presenta el escenario del encuentro alienígena y termina SIEMPRE invitando al jugador a participar activamente preguntándole qué quiere hacer, cómo responder, o qué decidir. Usa frases como "¿Qué decides hacer?", "¿Aceptas la invitación?", "¿Preguntas más sobre la liga?".

IMPORTANTE: Al final, SIEMPRE incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para generar una imagen estilo Comic de la escena con la nave alienígena en la autopista (máximo 50 palabras). Esta línea es OBLIGATORIA.`,

  CONTINUE_STORY: (historyText: string, userMessage: string) => 
    `Eres el narrador de un juego de aventura conversacional donde Joshua, un persona común, vive una aventura cósmica participando en la Liga Interplanetaria con aliens de diferentes mundos.
    
Historial de la conversación:
${historyText}

El jugador acaba de decir: "${userMessage}"

Continúa la historia basándote en la acción de Joshua. Describe las consecuencias de manera inmersiva, manteniendo el tono de aventura espacial y competencia intergaláctica. MÁXIMO 2 párrafos muy cortos. Incluye elementos como naves espaciales, aliens diversos, deportes cósmicos, tecnología avanzada, planetas extraños, o competencias que deciden el destino de civilizaciones.

Sé conciso y directo. Presenta la nueva situación y termina SIEMPRE invitando al jugador a participar activamente.

IMPORTANTE: Al final, SIEMPRE incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para generar una imagen estilo Comic de la nueva escena espacial con Joshua y aliens (máximo 50 palabras). Esta línea es OBLIGATORIA.`,

  GENERATE_IMAGE: (description: string) =>
    `Generate a 70s sci-fi comic style image: ${description}. Character Joshua: A regular person in casual clothes adapting to cosmic adventures. Include alien ships, diverse alien species, space sports, or futuristic technology. Style should be retro 70s comic book art. 9:16 aspect ratio.
  Any text in the image must be in Spanish.`,
};