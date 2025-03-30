// Código principal do plugin Quasar to Figma Converter

// Quando o plugin é iniciado
figma.showUI(__html__, { width: 450, height: 400 });

// Mapeamento de cores do Quasar para cores Figma
const quasarColors = {
  "primary": { r: 0.11, g: 0.62, b: 0.98 },
  "secondary": { r: 0.42, g: 0.45, b: 0.91 },
  "accent": { r: 0.91, g: 0.5, b: 0.07 },
  "positive": { r: 0.2, g: 0.8, b: 0.2 },
  "negative": { r: 0.9, g: 0.2, b: 0.2 },
  "warning": { r: 0.95, g: 0.65, b: 0.12 },
  "info": { r: 0.18, g: 0.6, b: 0.8 },
  "dark": { r: 0.13, g: 0.13, b: 0.13 },
  "white": { r: 1, g: 1, b: 1 },
  "black": { r: 0, g: 0, b: 0 },
};

// Mapeamento de tamanhos do Quasar
const quasarSizes = {
  "xs": { padding: 4, fontSize: 10, height: 24 },
  "sm": { padding: 6, fontSize: 12, height: 32 },
  "md": { padding: 8, fontSize: 14, height: 36 },
  "lg": { padding: 10, fontSize: 16, height: 42 },
  "xl": { padding: 12, fontSize: 18, height: 48 }
};

// Valores padrão para componentes Quasar
const quasarDefaultStyles = {
  'q-btn': {
    height: 36,
    minWidth: 64,
    padding: '0 16px',
    borderRadius: 4,
    color: "primary",
  },
  'q-card': {
    padding: 16,
    borderRadius: 4,
    backgroundColor: "white",
  },
  'q-input': {
    height: 40,
    borderRadius: 4,
    backgroundColor: "white",
  },
  'q-list': {
    width: 300,
  },
  'q-item': {
    height: 48,
    padding: '0 16px',
  }
};

// Dicionário para mapear componentes Quasar para nós Figma
const quasarToFigmaMapping = {
  // Componentes básicos
  'q-btn': createQButton,
  'q-card': createQCard,
  'q-input': createQInput,
  'q-checkbox': createQCheckbox,
  'q-radio': createQRadio,
  'q-toggle': createQToggle,
  'q-list': createQList,
  'q-item': createQItem,
  // Adicione mais mapeamentos conforme necessário
};

// Listener para mensagens da UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'close') {
    figma.closePlugin();
  }
  
  if (msg.type === 'convert-component') {
    try {
      // Processar o código do componente Vue.js/Quasar
      const result = await processQuasarComponent(msg.code);
      
      // Notificar a UI do resultado
      figma.ui.postMessage({
        type: 'conversion-result',
        success: true
      });
      
      // Centralizar a visualização no componente criado
      if (result) {
        figma.viewport.scrollAndZoomIntoView([result]);
        // Selecionar o componente recém-criado
        figma.currentPage.selection = [result];
      }
    } catch (error) {
      console.error('Erro ao converter componente:', error);
      
      // Notificar a UI do erro
      figma.ui.postMessage({
        type: 'conversion-result',
        success: false,
        error: error.message || 'Erro desconhecido ao converter o componente'
      });
    }
  }
};

// Função principal para processar o componente Quasar
async function processQuasarComponent(code) {
  // Extrair a seção <template> do código
  const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/i);
  
  if (!templateMatch || !templateMatch[1]) {
    throw new Error('Não foi possível encontrar a seção <template> no código');
  }
  
  const templateContent = templateMatch[1].trim();
  
  // Criar um nó raiz para conter o componente
  const componentRoot = figma.createFrame();
  componentRoot.name = "Quasar Component";
  componentRoot.layoutMode = "NONE";
  componentRoot.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  componentRoot.resize(400, 400);
  
  // Analisar o conteúdo do template e criar os nós Figma correspondentes
  await parseTemplateAndCreateNodes(templateContent, componentRoot);
  
  // Ajustar o tamanho do frame raiz para se adequar ao conteúdo
  const children = componentRoot.children;
  if (children.length > 0) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    children.forEach(child => {
      minX = Math.min(minX, child.x);
      minY = Math.min(minY, child.y);
      maxX = Math.max(maxX, child.x + child.width);
      maxY = Math.max(maxY, child.y + child.height);
    });
    
    // Reposicionar os filhos e redimensionar o frame
    children.forEach(child => {
      child.x -= minX;
      child.y -= minY;
    });
    
    componentRoot.resize(maxX - minX + 40, maxY - minY + 40);
  }
  
  return componentRoot;
}

// Função para analisar o template e criar os nós Figma correspondentes
async function parseTemplateAndCreateNodes(templateContent, parentNode, offsetX = 20, offsetY = 20) {
  // Simplifique o template removendo quebras de linha e espaços em excesso
  const cleanTemplate = templateContent.replace(/>\s+</g, '><').trim();
  
  // Estrutura para rastrear a posição atual
  let currentX = offsetX;
  let currentY = offsetY;
  let maxHeight = 0;
  
  // Extrair os elementos de nível superior
  const elements = extractElements(cleanTemplate);
  
  for (const element of elements) {
    const { tagName, attributes, content, isSelfClosing } = element;
    
    // Verificar se é um componente Quasar
    if (tagName.startsWith('q-')) {
      // Obter a função de criação apropriada ou usar uma função genérica
      const createFn = quasarToFigmaMapping[tagName] || createGenericQuasarComponent;
      
      // Criar o componente Quasar
      const componentNode = await createFn(tagName, attributes, content, parentNode);
      
      if (componentNode) {
        // Posicionar o componente
        componentNode.x = currentX;
        componentNode.y = currentY;
        
        // Atualizar a posição para o próximo componente
        currentY += componentNode.height + 20;
        maxHeight = Math.max(maxHeight, componentNode.height);
      }
    } else if (['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      // Elementos HTML comuns
      const node = await createHTMLElement(tagName, attributes, content, parentNode);
      
      if (node) {
        // Posicionar o elemento
        node.x = currentX;
        node.y = currentY;
        
        // Atualizar a posição para o próximo elemento
        currentY += node.height + 20;
        maxHeight = Math.max(maxHeight, node.height);
      }
    } else if (tagName === 'template' && attributes.some(attr => attr.name === 'v-if' || attr.name === 'v-for')) {
      // Lidar com diretivas Vue.js como v-if, v-for, etc.
      // Criar um frame para representar visualmente a condição/iteração
      const conditionalFrame = figma.createFrame();
      conditionalFrame.name = `${tagName}-conditional`;
      conditionalFrame.layoutMode = "VERTICAL";
      conditionalFrame.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
      conditionalFrame.cornerRadius = 4;
      conditionalFrame.paddingLeft = 10;
      conditionalFrame.paddingRight = 10;
      conditionalFrame.paddingTop = 10;
      conditionalFrame.paddingBottom = 10;
      
      // Adicionar um label para a diretiva
      const directiveLabel = figma.createText();
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      directiveLabel.fontName = { family: "Inter", style: "Regular" };
      directiveLabel.characters = attributes
        .filter(attr => attr.name === 'v-if' || attr.name === 'v-for')
        .map(attr => `${attr.name}="${attr.value}"`)
        .join(", ");
      directiveLabel.fontSize = 10;
      directiveLabel.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
      
      conditionalFrame.appendChild(directiveLabel);
      
      // Processar o conteúdo dentro da diretiva
      if (content) {
        await parseTemplateAndCreateNodes(content, conditionalFrame, 10, directiveLabel.height + 10);
      }
      
      parentNode.appendChild(conditionalFrame);
      
      // Posicionar o frame
      conditionalFrame.x = currentX;
      conditionalFrame.y = currentY;
      
      // Atualizar a posição para o próximo elemento
      currentY += conditionalFrame.height + 20;
      maxHeight = Math.max(maxHeight, conditionalFrame.height);
    }
  }
  
  return { lastY: currentY, maxHeight };
}

// Função para extrair elementos de um template HTML
function extractElements(template) {
  const elements = [];
  let index = 0;
  
  while (index < template.length) {
    // Encontrar a próxima tag de abertura
    const tagStartIndex = template.indexOf('<', index);
    
    if (tagStartIndex === -1) break;
    
    // Encontrar o final da tag de abertura
    let tagEndIndex = template.indexOf('>', tagStartIndex);
    
    if (tagEndIndex === -1) break;
    
    // Verificar se é uma tag de auto-fechamento (como <img />)
    const isSelfClosing = template.charAt(tagEndIndex - 1) === '/';
    
    // Extrair o nome da tag e atributos
    const tagParts = template.substring(tagStartIndex + 1, isSelfClosing ? tagEndIndex - 1 : tagEndIndex).trim().split(/\s+/);
    const tagName = tagParts[0];
    
    // Extrair atributos
    const attributes = [];
    let attributesStr = template.substring(tagStartIndex + tagName.length + 1, isSelfClosing ? tagEndIndex - 1 : tagEndIndex).trim();
    
    // Expressão regular para extrair atributos
    const attrRegex = /([a-zA-Z0-9\-_:@\.]+)(?:=(['"])((?:(?!\2).)*)\2)?/g;
    let attrMatch;
    
    while ((attrMatch = attrRegex.exec(attributesStr)) !== null) {
      attributes.push({
        name: attrMatch[1],
        value: attrMatch[3] || ''
      });
    }
    
    // Se for uma tag de auto-fechamento, não há conteúdo
    if (isSelfClosing) {
      elements.push({
        tagName,
        attributes,
        content: '',
        isSelfClosing: true
      });
      
      index = tagEndIndex + 1;
      continue;
    }
    
    // Encontrar a tag de fechamento correspondente
    const closingTagPattern = new RegExp(`<\\/${tagName}\\s*>`, 'i');
    const closingTagMatch = closingTagPattern.exec(template.substring(tagEndIndex + 1));
    
    if (!closingTagMatch) {
      // Tag sem fechamento adequado, avançar para o próximo caractere
      index = tagEndIndex + 1;
      continue;
    }
    
    const closingTagIndex = tagEndIndex + 1 + closingTagMatch.index;
    const content = template.substring(tagEndIndex + 1, closingTagIndex);
    
    elements.push({
      tagName,
      attributes,
      content,
      isSelfClosing: false
    });
    
    index = closingTagIndex + closingTagMatch[0].length;
  }
  
  return elements;
}

// Função para extrair as propriedades implícitas de componentes Quasar
function extractImplicitProperties(attributes) {
  const properties = {
    color: "primary",
    size: "md",
    flat: false,
    outline: false,
    round: false,
    dense: false,
    bordered: false,
    dark: false
  };
  
  // Procurar por classes que definem propriedades
  const classAttr = attributes.find(attr => attr.name === "class");
  if (classAttr) {
    const classes = classAttr.value.split(" ");
    
    // Procurar classes como text-primary, bg-secondary, etc.
    for (const cls of classes) {
      if (cls.startsWith("text-")) {
        properties.textColor = cls.substring(5);
      }
      
      if (cls.startsWith("bg-")) {
        properties.bgColor = cls.substring(3);
      }
      
      if (cls.includes("--flat")) {
        properties.flat = true;
      }
      
      if (cls.includes("--outline")) {
        properties.outline = true;
      }
      
      if (cls.includes("--round")) {
        properties.round = true;
      }
      
      if (cls.includes("--dense")) {
        properties.dense = true;
      }
      
      if (cls.includes("--bordered")) {
        properties.bordered = true;
      }
      
      if (cls.includes("--dark")) {
        properties.dark = true;
      }
      
      // Tamanhos
      if (cls.includes("--xs")) properties.size = "xs";
      if (cls.includes("--sm")) properties.size = "sm";
      if (cls.includes("--md")) properties.size = "md";
      if (cls.includes("--lg")) properties.size = "lg";
      if (cls.includes("--xl")) properties.size = "xl";
    }
  }
  
  // Sobrescrever com atributos explícitos
  for (const attr of attributes) {
    if (attr.name === "color") properties.color = attr.value;
    if (attr.name === "text-color") properties.textColor = attr.value;
    if (attr.name === "size") properties.size = attr.value;
    if (attr.name === "flat") properties.flat = true;
    if (attr.name === "outline") properties.outline = true;
    if (attr.name === "round") properties.round = true;
    if (attr.name === "dense") properties.dense = true;
    if (attr.name === "bordered") properties.bordered = true;
    if (attr.name === "dark") properties.dark = true;
  }
  
  return properties;
}

// Função para parsear estilos inline
function parseInlineStyles(styleString) {
  if (!styleString) return {};
  
  const styles = {};
  const declarations = styleString.split(';');
  
  for (const declaration of declarations) {
    if (!declaration.trim()) continue;
    
    const parts = declaration.split(':');
    if (parts.length < 2) continue;
    
    const property = parts[0].trim();
    const value = parts.slice(1).join(':').trim(); // Juntar novamente em caso de URLs com :
    
    if (!property || !value) continue;
    
    // Converter kebab-case para camelCase
    const camelProperty = property.replace(/-([a-z])/g, function(match, letter) {
      return letter.toUpperCase();
    });
    styles[camelProperty] = value;
  }
  
  return styles;
}

// Função para aplicar estilos padrão do Quasar
function applyDefaultStyles(node, componentType) {
  const defaults = quasarDefaultStyles[componentType];
  if (defaults) {
    if (defaults.height) node.resize(node.width, defaults.height);
    if (defaults.minWidth && node.width < defaults.minWidth) node.resize(defaults.minWidth, node.height);
    if (defaults.borderRadius) node.cornerRadius = defaults.borderRadius;
    
    if (defaults.color && quasarColors[defaults.color]) {
      node.fills = [{ type: 'SOLID', color: quasarColors[defaults.color] }];
    }
    
    if (defaults.padding) {
      if (typeof defaults.padding === 'string') {
        const paddingParts = defaults.padding.split(' ').map(Number);
        if (paddingParts.length === 2) {
          node.paddingTop = paddingParts[0];
          node.paddingBottom = paddingParts[0];
          node.paddingLeft = paddingParts[1];
          node.paddingRight = paddingParts[1];
        }
      } else {
        node.paddingTop = defaults.padding;
        node.paddingBottom = defaults.padding;
        node.paddingLeft = defaults.padding;
        node.paddingRight = defaults.padding;
      }
    }
  }
}

// Função utilitária para processar atributos e aplicá-los ao nó Figma
function processNodeAttributes(node, attributes) {
  let styles = {};
  
  // Procurar pelo atributo style
  const styleAttr = attributes.find(attr => attr.name === 'style');
  if (styleAttr) {
    styles = parseInlineStyles(styleAttr.value);
  }
  
  // Aplicar estilos
  if (styles.backgroundColor || styles.background) {
    const bgColor = styles.backgroundColor || styles.background;
    
    if (bgColor.startsWith('#')) {
      const hex = bgColor.substring(1);
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      
      node.fills = [{ type: 'SOLID', color: { r, g, b } }];
    }
  }
  
  if (styles.color && node.type === 'TEXT') {
    if (styles.color.startsWith('#')) {
      const hex = styles.color.substring(1);
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      
      node.fills = [{ type: 'SOLID', color: { r, g, b } }];
    }
  }
  
  if (styles.borderRadius || styles.borderRadius === 0) {
    node.cornerRadius = parseInt(styles.borderRadius);
  }
  
  if (styles.padding) {
    const padding = parseInt(styles.padding);
    if (!isNaN(padding) && node.type === 'FRAME') {
      node.paddingTop = padding;
      node.paddingBottom = padding;
      node.paddingLeft = padding;
      node.paddingRight = padding;
    }
  }
  
  if (styles.width) {
    const width = parseFloat(styles.width);
    if (!isNaN(width)) {
      // Verificar se é porcentagem ou pixel
      if (styles.width.endsWith('%')) {
        // Em porcentagem, usar um valor proporcional
        node.resize(width * 3, node.height); // multiplicar por 3 para ter uma representação visual razoável
      } else {
        node.resize(width, node.height);
      }
    }
  }
  
  if (styles.height) {
    const height = parseFloat(styles.height);
    if (!isNaN(height)) {
      if (styles.height.endsWith('%')) {
        node.resize(node.width, height * 2); // multiplicar por 2 para representação visual
      } else {
        node.resize(node.width, height);
      }
    }
  }
  
  if (styles.fontWeight && node.type === 'TEXT') {
    if (styles.fontWeight === 'bold' || parseInt(styles.fontWeight) >= 600) {
      node.fontName = { family: node.fontName.family, style: "Bold" };
    }
  }
  
  if (styles.fontSize && node.type === 'TEXT') {
    const fontSize = parseInt(styles.fontSize);
    if (!isNaN(fontSize)) {
      node.fontSize = fontSize;
    }
  }
  
  if (styles.border) {
    const borderMatch = styles.border.match(/(\d+)px\s+(\w+)\s+([#\w]+)/);
    if (borderMatch) {
      const width = parseInt(borderMatch[1]);
      const color = borderMatch[3];
      
      node.strokeWeight = width;
      
      if (color.startsWith('#')) {
        const hex = color.substring(1);
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        
        node.strokes = [{ type: 'SOLID', color: { r, g, b } }];
      }
    }
  }
  
  // Processar classes (simplificado)
  const classAttr = attributes.find(attr => attr.name === 'class');
  if (classAttr) {
    // Nomear o nó com base na primeira classe
    const firstClass = classAttr.value.split(' ')[0];
    if (firstClass) {
      node.name = `${node.name}-${firstClass}`;
    }
  }
}

// Função para criar um elemento HTML genérico
async function createHTMLElement(tagName, attributes, content, parentNode) {
  switch (tagName) {
    case 'div':
    case 'span': {
      const frame = figma.createFrame();
      frame.name = tagName;
      frame.layoutMode = "VERTICAL";
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      
      // Processar atributos
      processNodeAttributes(frame, attributes);
      
      // Processar conteúdo filho recursivamente
      if (content.trim()) {
        // Verificar se o conteúdo tem apenas texto
        if (!content.includes('<')) {
          // Adicionar um nó de texto
          const textNode = figma.createText();
          await figma.loadFontAsync({ family: "Inter", style: "Regular" });
          textNode.fontName = { family: "Inter", style: "Regular" };
          textNode.characters = content.trim();
          frame.appendChild(textNode);
        } else {
          // Processar elementos filhos
          await parseTemplateAndCreateNodes(content, frame, 10, 10);
        }
      }
      
      parentNode.appendChild(frame);
      return frame;
    }
      
    case 'p':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      // Criar um nó de texto com o estilo apropriado
      const textNode = figma.createText();
      
      // Carregar a fonte
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      textNode.fontName = { family: "Inter", style: "Regular" };
      
      // Definir o tamanho da fonte baseado na tag
      switch (tagName) {
        case 'h1': textNode.fontSize = 32; break;
        case 'h2': textNode.fontSize = 24; break;
        case 'h3': textNode.fontSize = 18; break;
        case 'h4': textNode.fontSize = 16; break;
        case 'h5': textNode.fontSize = 14; break;
        case 'h6': textNode.fontSize = 12; break;
        default: textNode.fontSize = 14; break;
      }
      
      // Definir o nome e o conteúdo
      textNode.name = tagName;
      textNode.characters = content.trim();
      
      // Processar atributos
      processNodeAttributes(textNode, attributes);
      
      parentNode.appendChild(textNode);
      return textNode;
    }
      
    default:
      return null;
  }
}
// Funções específicas para criar componentes Quasar
async function createQButton(tagName, attributes, content, parentNode) {
  // Extrair propriedades
  const props = extractImplicitProperties(attributes);
  
  // Definir cores
  const bgColor = quasarColors[props.color] || quasarColors.primary;
  const textColor = quasarColors[props.textColor] || quasarColors.white;
  
  // Definir tamanho
  const sizeConfig = quasarSizes[props.size] || quasarSizes.md;
  
  // Criar frame principal para o botão
  const buttonFrame = figma.createFrame();
  buttonFrame.name = "q-btn";
  buttonFrame.layoutMode = "HORIZONTAL";
  buttonFrame.primaryAxisAlignItems = "CENTER";
  buttonFrame.counterAxisAlignItems = "CENTER";
  
  // Aplicar estilos baseado nas propriedades
  if (props.flat) {
    buttonFrame.fills = [];
  } else if (props.outline) {
    buttonFrame.fills = [];
    buttonFrame.strokeWeight = 1;
    buttonFrame.strokes = [{ type: 'SOLID', color: bgColor }];
  } else {
    buttonFrame.fills = [{ type: 'SOLID', color: bgColor }];
  }
  
  // Aplicar arredondamento
  if (props.round) {
    buttonFrame.cornerRadius = 50; // para tornar circular
  } else {
    buttonFrame.cornerRadius = 4;
  }
  
  // Aplicar tamanho
  buttonFrame.paddingLeft = sizeConfig.padding * 2;
  buttonFrame.paddingRight = sizeConfig.padding * 2;
  buttonFrame.paddingTop = sizeConfig.padding;
  buttonFrame.paddingBottom = sizeConfig.padding;
  
  // Aplicar o tamanho mínimo padrão do botão
  buttonFrame.resize(Math.max(buttonFrame.width, 64), sizeConfig.height);
  
  // Criar o conteúdo interno do botão
  const contentFrame = figma.createFrame();
  contentFrame.name = "q-btn__content";
  contentFrame.layoutMode = "HORIZONTAL";
  contentFrame.primaryAxisAlignItems = "CENTER";
  contentFrame.counterAxisAlignItems = "CENTER";
  contentFrame.fills = [];
  contentFrame.strokeWeight = 0;
  
  // Adicionar texto do botão
  const buttonText = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  buttonText.fontName = { family: "Inter", style: "Medium" };
  buttonText.characters = content.trim() || "Button";
  buttonText.fontSize = sizeConfig.fontSize;
  
  // Cor do texto baseada no estilo
  if (props.flat || props.outline) {
    buttonText.fills = [{ type: 'SOLID', color: bgColor }];
  } else {
    buttonText.fills = [{ type: 'SOLID', color: textColor }];
  }
  
  contentFrame.appendChild(buttonText);
  buttonFrame.appendChild(contentFrame);
  
  // Processar quaisquer outros atributos
  processNodeAttributes(buttonFrame, attributes);
  
  parentNode.appendChild(buttonFrame);
  return buttonFrame;
}

async function createQCard(tagName, attributes, content, parentNode) {
  // Extrair propriedades
  const props = extractImplicitProperties(attributes);
  
  // Criar frame principal para o card
  const cardFrame = figma.createFrame();
  cardFrame.name = "q-card";
  cardFrame.layoutMode = "VERTICAL";
  
  // Aplicar estilos baseado nas propriedades
  if (props.dark) {
    cardFrame.fills = [{ type: 'SOLID', color: quasarColors.dark }];
  } else {
    cardFrame.fills = [{ type: 'SOLID', color: quasarColors.white }];
  }
  
  cardFrame.cornerRadius = 4;
  
  if (props.bordered) {
    cardFrame.strokeWeight = 1;
    cardFrame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  } else {
    cardFrame.strokeWeight = 0;
  }
  
  if (!props.flat) {
    cardFrame.effects = [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 2 },
        radius: 4,
        visible: true,
        blendMode: "NORMAL"
      }
    ];
  } else {
    cardFrame.effects = [];
  }
  
  cardFrame.paddingLeft = 16;
  cardFrame.paddingRight = 16;
  cardFrame.paddingTop = 16;
  cardFrame.paddingBottom = 16;
  
  // Aplicar tamanho padrão se nenhum tamanho específico estiver definido nos atributos
  const initialWidth = 300;
  const initialHeight = 200;
  cardFrame.resize(initialWidth, initialHeight);
  
  // Processar quaisquer outros atributos
  processNodeAttributes(cardFrame, attributes);
  
  // Processar conteúdo filho
  if (content.trim()) {
    await parseTemplateAndCreateNodes(content, cardFrame, 0, 0);
  }
  
  parentNode.appendChild(cardFrame);
  return cardFrame;
}

async function createQInput(tagName, attributes, content, parentNode) {
  // Extrair propriedades
  const props = extractImplicitProperties(attributes);
  
  // Criar frame principal para o input
  const inputFrame = figma.createFrame();
  inputFrame.name = "q-input";
  inputFrame.layoutMode = "VERTICAL";
  
  // Aplicar cores baseadas nas propriedades
  if (props.dark) {
    inputFrame.fills = [{ type: 'SOLID', color: quasarColors.dark }];
  } else {
    inputFrame.fills = [{ type: 'SOLID', color: quasarColors.white }];
  }
  
  // Aplicar bordas
  if (props.outlined || props.bordered) {
    inputFrame.strokeWeight = 1;
    inputFrame.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
  } else {
    inputFrame.strokeWeight = 0;
    // Para inputs não outlined, adicionar linha de fundo
    const bottomLine = figma.createRectangle();
    bottomLine.name = "q-input__bottom-line";
    bottomLine.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
    bottomLine.resize(inputFrame.width, 1);
    bottomLine.y = inputFrame.height - 1;
    inputFrame.appendChild(bottomLine);
  }
  
  inputFrame.cornerRadius = props.rounded ? 8 : 4;
  
  // Processar atributos
  let placeholder = "";
  let label = "";
  
  for (const attr of attributes) {
    if (attr.name === 'placeholder') {
      placeholder = attr.value;
    } else if (attr.name === 'label') {
      label = attr.value;
    }
  }
  
  // Calcular o tamanho baseado nas propriedades
  const sizeConfig = quasarSizes[props.size] || quasarSizes.md;
  
  // Adicionar label se especificado
  if (label) {
    const labelText = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    labelText.fontName = { family: "Inter", style: "Regular" };
    labelText.characters = label;
    labelText.fontSize = sizeConfig.fontSize - 2;
    labelText.name = "q-input__label";
    labelText.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
    inputFrame.appendChild(labelText);
  }
  
  // Adicionar o campo de entrada
  const inputField = figma.createFrame();
  inputField.name = "q-input__control";
  inputField.layoutMode = "HORIZONTAL";
  inputField.primaryAxisAlignItems = "CENTER";
  inputField.fills = [];
  inputField.paddingLeft = 12;
  inputField.paddingRight = 12;
  inputField.paddingTop = 8;
  inputField.paddingBottom = 8;
  
  // Adicionar texto do placeholder
  const inputText = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  inputText.fontName = { family: "Inter", style: "Regular" };
  inputText.characters = placeholder || "Input text";
  inputText.fontSize = sizeConfig.fontSize;
  inputText.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
  
  inputField.appendChild(inputText);
  inputFrame.appendChild(inputField);
  
  // Definir tamanho baseado no tamanho configurado
  inputFrame.resize(240, sizeConfig.height + (label ? 20 : 0));
  
  // Processar atributos extras
  processNodeAttributes(inputFrame, attributes);
  
  parentNode.appendChild(inputFrame);
  return inputFrame;
}

// Funções auxiliares para componentes ainda não implementados
async function createQCheckbox(tagName, attributes, content, parentNode) {
  const props = extractImplicitProperties(attributes);
  
  // Criar um frame para o checkbox
  const checkboxFrame = figma.createFrame();
  checkboxFrame.name = "q-checkbox";
  checkboxFrame.layoutMode = "HORIZONTAL";
  checkboxFrame.primaryAxisAlignItems = "CENTER";
  checkboxFrame.counterAxisAlignItems = "CENTER";
  checkboxFrame.itemSpacing = 8;
  checkboxFrame.fills = [];
  
  // Criar o box do checkbox
  const box = figma.createRectangle();
  box.name = "q-checkbox__box";
  box.resize(18, 18);
  box.cornerRadius = 3;
  
  const bgColor = quasarColors[props.color] || quasarColors.primary;
  
  // Verificar se está selecionado
  const isChecked = attributes.some(attr => attr.name === 'value' || attr.name === 'model-value');
  
  if (isChecked) {
    box.fills = [{ type: 'SOLID', color: bgColor }];
    
    // Adicionar um "check" visual
    const check = figma.createVector();
    check.name = "q-checkbox__check";
    check.fills = [{ type: 'SOLID', color: quasarColors.white }];
    check.vectorNetwork = {
      vertices: [
        { x: 4, y: 9 },
        { x: 7, y: 12 },
        { x: 14, y: 5 }
      ],
      segments: [
        { start: 0, end: 1 },
        { start: 1, end: 2 }
      ],
      regions: []
    };
    check.strokeWeight = 2;
    check.strokes = [{ type: 'SOLID', color: quasarColors.white }];
    
    box.appendChild(check);
  } else {
    box.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    box.strokeWeight = 1;
    box.strokes = [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7 } }];
  }
  
  checkboxFrame.appendChild(box);
  
  // Adicionar label do checkbox
  const label = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  label.fontName = { family: "Inter", style: "Regular" };
  label.characters = content.trim() || "Checkbox";
  label.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  
  checkboxFrame.appendChild(label);
  
  // Definir o tamanho
  const sizeConfig = quasarSizes[props.size] || quasarSizes.md;
  label.fontSize = sizeConfig.fontSize;
  
  // Processar outros atributos
  processNodeAttributes(checkboxFrame, attributes);
  
  parentNode.appendChild(checkboxFrame);
  return checkboxFrame;
}

async function createQRadio(tagName, attributes, content, parentNode) {
  const props = extractImplicitProperties(attributes);
  
  // Criar um frame para o radio
  const radioFrame = figma.createFrame();
  radioFrame.name = "q-radio";
  radioFrame.layoutMode = "HORIZONTAL";
  radioFrame.primaryAxisAlignItems = "CENTER";
  radioFrame.counterAxisAlignItems = "CENTER";
  radioFrame.itemSpacing = 8;
  radioFrame.fills = [];
  
  // Criar o círculo do radio
  const circle = figma.createEllipse();
  circle.name = "q-radio__circle";
  circle.resize(18, 18);
  
  const bgColor = quasarColors[props.color] || quasarColors.primary;
  
  // Verificar se está selecionado
  const isChecked = attributes.some(attr => attr.name === 'value' || attr.name === 'model-value');
  
  if (isChecked) {
    circle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    circle.strokeWeight = 1;
    circle.strokes = [{ type: 'SOLID', color: bgColor }];
    
    // Adicionar um círculo interno para indicar seleção
    const innerCircle = figma.createEllipse();
    innerCircle.name = "q-radio__inner-circle";
    innerCircle.resize(10, 10);
    innerCircle.x = 4;
    innerCircle.y = 4;
    innerCircle.fills = [{ type: 'SOLID', color: bgColor }];
    
    circle.appendChild(innerCircle);
  } else {
    circle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    circle.strokeWeight = 1;
    circle.strokes = [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7 } }];
  }
  
  radioFrame.appendChild(circle);
  
  // Adicionar label do radio
  const label = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  label.fontName = { family: "Inter", style: "Regular" };
  label.characters = content.trim() || "Radio";
  label.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  
  radioFrame.appendChild(label);
  
  // Definir o tamanho
  const sizeConfig = quasarSizes[props.size] || quasarSizes.md;
  label.fontSize = sizeConfig.fontSize;
  
  // Processar outros atributos
  processNodeAttributes(radioFrame, attributes);
  
  parentNode.appendChild(radioFrame);
  return radioFrame;
}

async function createQToggle(tagName, attributes, content, parentNode) {
  const props = extractImplicitProperties(attributes);
  
  // Criar um frame para o toggle
  const toggleFrame = figma.createFrame();
  toggleFrame.name = "q-toggle";
  toggleFrame.layoutMode = "HORIZONTAL";
  toggleFrame.primaryAxisAlignItems = "CENTER";
  toggleFrame.counterAxisAlignItems = "CENTER";
  toggleFrame.itemSpacing = 8;
  toggleFrame.fills = [];
  
  // Criar o fundo do toggle
  const track = figma.createRectangle();
  track.name = "q-toggle__track";
  track.resize(36, 14);
  track.cornerRadius = 7;
  
  const bgColor = quasarColors[props.color] || quasarColors.primary;
  
  // Verificar se está selecionado
  const isChecked = attributes.some(attr => attr.name === 'value' || attr.name === 'model-value');
  
  if (isChecked) {
    // Aplicar cor com transparência sem usar o operador spread
    const alphaColor = Object.assign({}, bgColor);
    alphaColor.a = 0.5;
    track.fills = [{ type: 'SOLID', color: alphaColor }];
  } else {
    track.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  }
  
  toggleFrame.appendChild(track);
  
  // Criar o thumb (círculo móvel)
  const thumb = figma.createEllipse();
  thumb.name = "q-toggle__thumb";
  thumb.resize(20, 20);
  
  // Posicionar o thumb baseado no estado
  if (isChecked) {
    thumb.x = 16;
    thumb.y = -3;
    thumb.fills = [{ type: 'SOLID', color: bgColor }];
  } else {
    thumb.x = 0;
    thumb.y = -3;
    thumb.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    thumb.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
    thumb.strokeWeight = 1;
  }
  
  // Adicionar sombra ao thumb
  thumb.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.2 },
      offset: { x: 0, y: 1 },
      radius: 2,
      visible: true,
      blendMode: "NORMAL"
    }
  ];
  
  toggleFrame.appendChild(thumb);
  
  // Adicionar label do toggle
  const label = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  label.fontName = { family: "Inter", style: "Regular" };
  label.characters = content.trim() || "Toggle";
  label.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  label.x = 42;
  
  toggleFrame.appendChild(label);
  
  // Definir o tamanho
  const sizeConfig = quasarSizes[props.size] || quasarSizes.md;
  label.fontSize = sizeConfig.fontSize;
  
  // Processar outros atributos
  processNodeAttributes(toggleFrame, attributes);
  
  parentNode.appendChild(toggleFrame);
  return toggleFrame;
}

async function createQList(tagName, attributes, content, parentNode) {
  // Extrair propriedades
  const props = extractImplicitProperties(attributes);
  
  // Criar frame principal para a lista
  const listFrame = figma.createFrame();
  listFrame.name = "q-list";
  listFrame.layoutMode = "VERTICAL";
  listFrame.itemSpacing = props.dense ? 0 : 1;
  
  // Aplicar cores
  if (props.dark) {
    listFrame.fills = [{ type: 'SOLID', color: quasarColors.dark }];
  } else {
    listFrame.fills = [{ type: 'SOLID', color: quasarColors.white }];
  }
  
  // Aplicar bordas
  if (props.bordered) {
    listFrame.strokeWeight = 1;
    listFrame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  } else {
    listFrame.strokeWeight = 0;
  }
  
  // Definir tamanho inicial
  listFrame.resize(300, 100);
  
  // Processar atributos
  processNodeAttributes(listFrame, attributes);
  
  // Processar conteúdo filho
  if (content.trim()) {
    await parseTemplateAndCreateNodes(content, listFrame, 0, 0);
  }
  
  parentNode.appendChild(listFrame);
  return listFrame;
}

async function createQItem(tagName, attributes, content, parentNode) {
  // Extrair propriedades
  const props = extractImplicitProperties(attributes);
  
  // Criar frame para o item da lista
  const itemFrame = figma.createFrame();
  itemFrame.name = "q-item";
  itemFrame.layoutMode = "HORIZONTAL";
  itemFrame.counterAxisAlignItems = "CENTER";
  
  // Definir padding baseado na densidade
  if (props.dense) {
    itemFrame.paddingLeft = 8;
    itemFrame.paddingRight = 8;
    itemFrame.paddingTop = 4;
    itemFrame.paddingBottom = 4;
  } else {
    itemFrame.paddingLeft = 16;
    itemFrame.paddingRight = 16;
    itemFrame.paddingTop = 12;
    itemFrame.paddingBottom = 12;
  }
  
  // Aplicar cores
  if (props.active) {
    const bgColor = quasarColors[props.color] || quasarColors.primary;
    // Criar cor com transparência sem usar o operador spread
    const alphaColor = Object.assign({}, bgColor);
    alphaColor.a = 0.1;
    itemFrame.fills = [{ type: 'SOLID', color: alphaColor }];
  } else {
    itemFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  }
  
  // Processar atributos
  processNodeAttributes(itemFrame, attributes);
  
  // Processar conteúdo filho
  if (content.trim()) {
    // Verificar se o conteúdo tem apenas texto
    if (!content.includes('<')) {
      // Adicionar um nó de texto
      const textNode = figma.createText();
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      textNode.fontName = { family: "Inter", style: "Regular" };
      textNode.characters = content.trim();
      itemFrame.appendChild(textNode);
    } else {
      // Processar elementos filhos
      await parseTemplateAndCreateNodes(content, itemFrame, 0, 0);
    }
  }
  
  parentNode.appendChild(itemFrame);
  return itemFrame;
}

// Função genérica para outros componentes Quasar não implementados especificamente
async function createGenericQuasarComponent(tagName, attributes, content, parentNode) {
  // Extrair propriedades implícitas
  const props = extractImplicitProperties(attributes);
  
  // Criar um frame para representar o componente
  const componentFrame = figma.createFrame();
  componentFrame.name = tagName;
  componentFrame.layoutMode = "VERTICAL";
  
  // Aplicar cores baseado nas propriedades
  if (props.dark) {
    componentFrame.fills = [{ type: 'SOLID', color: quasarColors.dark }];
  } else {
    componentFrame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
  }
  
  componentFrame.cornerRadius = 4;
  componentFrame.strokeWeight = 1;
  componentFrame.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
  componentFrame.paddingLeft = 12;
  componentFrame.paddingRight = 12;
  componentFrame.paddingTop = 8;
  componentFrame.paddingBottom = 8;
  
  // Adicionar um rótulo para o componente
  const componentLabel = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  componentLabel.fontName = { family: "Inter", style: "Medium" };
  componentLabel.characters = tagName;
  componentLabel.fontSize = 12;
  componentLabel.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
  
  componentFrame.appendChild(componentLabel);
  
  // Processar atributos
  if (attributes.length > 0) {
    const attributesText = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    attributesText.fontName = { family: "Inter", style: "Regular" };
    attributesText.characters = attributes
      .map(attr => `${attr.name}="${attr.value}"`)
      .join("\n");
    attributesText.fontSize = 10;
    attributesText.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
    
    componentFrame.appendChild(attributesText);
  }
  
  // Processar conteúdo filho
  if (content.trim()) {
    // Criar um frame para o conteúdo
    const contentFrame = figma.createFrame();
    contentFrame.name = `${tagName}__content`;
    contentFrame.layoutMode = "VERTICAL";
    contentFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    contentFrame.cornerRadius = 2;
    contentFrame.paddingLeft = 8;
    contentFrame.paddingRight = 8;
    contentFrame.paddingTop = 8;
    contentFrame.paddingBottom = 8;
    contentFrame.strokeWeight = 1;
    contentFrame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
    
    // Verificar se o conteúdo tem apenas texto
    if (!content.includes('<')) {
      // Adicionar um nó de texto
      const textNode = figma.createText();
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      textNode.fontName = { family: "Inter", style: "Regular" };
      textNode.characters = content.trim();
      contentFrame.appendChild(textNode);
    } else {
      // Processar elementos filhos
      await parseTemplateAndCreateNodes(content, contentFrame, 8, 8);
    }
    
    componentFrame.appendChild(contentFrame);
  }
  
  // Adicionar o componente ao nó pai
  parentNode.appendChild(componentFrame);
  
  return componentFrame;
}