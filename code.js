// Mostrar a UI
figma.showUI(__html__, { width: 450, height: 550 });

// Cores padrão do Quasar (versão expandida)
var quasarColors = {
  'primary': { r: 0.1, g: 0.5, b: 0.9 },
  'secondary': { r: 0.33, g: 0.33, b: 0.33 },
  'accent': { r: 0.83, g: 0.33, b: 0.04 },
  'positive': { r: 0.13, g: 0.7, b: 0.3 },
  'negative': { r: 0.86, g: 0.09, b: 0.15 },
  'info': { r: 0.04, g: 0.58, b: 0.74 },
  'warning': { r: 0.94, g: 0.67, b: 0.11 },
  'dark': { r: 0.19, g: 0.19, b: 0.19 },
  'white': { r: 1, g: 1, b: 1 },
  'black': { r: 0, g: 0, b: 0 },
  'grey': { r: 0.5, g: 0.5, b: 0.5 }
};

// Mapeamento de componentes básicos
var quasarComponentMap = {
  // Componentes básicos
  'q-btn': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: quasarColors.primary }]
    }
  },
  'q-card': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
      effects: [
        {
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.2 },
          offset: { x: 0, y: 2 },
          radius: 4,
          visible: true,
          blendMode: 'NORMAL'
        }
      ]
    }
  },
  'q-card-section': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      itemSpacing: 4,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-card-actions': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  }
};

// Mapeamento de componentes de formulário
var quasarFormComponents = {
  'q-input': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 250,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }],
      strokes: [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }],
      strokeWeight: 1
    }
  },
  'q-checkbox': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0 } }]
    }
  },
  'q-toggle': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0 } }]
    }
  },
  'q-radio': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0 } }]
    }
  },
  'q-select': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 250,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }],
      strokes: [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }],
      strokeWeight: 1
    }
  }
};

// Mapeamento de componentes de layout
var quasarLayoutComponents = {
  // Componentes de layout
  'q-layout': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      height: 768,
      itemSpacing: 0,
      fills: [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }]
    }
  },
  'q-page': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 24,
      paddingBottom: 24,
      itemSpacing: 16,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-header': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: quasarColors.primary }]
    }
  },
  'q-footer': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8, 
      paddingBottom: 8,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: quasarColors.dark }]
    }
  },
  'q-drawer': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'FIXED',
      width: 256,
      height: 768,
      itemSpacing: 0,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
      effects: [
        {
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 2, y: 0 },
          radius: 4,
          visible: true,
          blendMode: 'NORMAL'
        }
      ]
    }
  },
  'q-toolbar': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }]
    }
  }
};

// Mapeamento de componentes de navegação
var quasarNavComponents = {
  'q-tabs': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      itemSpacing: 0,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-tab': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 12,
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 4,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-tab-panels': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-tab-panel': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      itemSpacing: 16,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  }
};

// Adiciona todos os componentes ao mapa principal
Object.assign(quasarComponentMap, quasarFormComponents, quasarLayoutComponents, quasarNavComponents);

// Adiciona outros componentes especiais
quasarComponentMap['div'] = {
  type: 'FRAME',
  properties: {
    fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  }
};
// Extrair o HTML do template
function extractTemplateContent(code) {
  var templateMatch = code.match(/<template>\s*([\s\S]*?)\s*<\/template>/);
  
  if (!templateMatch) {
    throw new Error("Não foi possível encontrar a seção <template> no código");
  }
  
  return templateMatch[1].trim();
}

// Extrair o nome do componente da seção script, se disponível
function extractComponentName(code) {
  var scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/);
  
  if (scriptMatch) {
    var nameMatch = scriptMatch[1].match(/name:\s*['"]([^'"]+)['"]/);
    if (nameMatch) {
      return nameMatch[1];
    }
  }
  
  return "QuasarComponent";
}

// Extrair valor de um atributo do HTML
function extractAttribute(html, attribute) {
  if (!html) return null;
  var match = html.match(new RegExp(attribute + '=["\'](.*?)["\']'));
  return match ? match[1] : null;
}

// Extrair tag específica de um HTML
function extractTag(html, tagName) {
  var regExp = new RegExp('<' + tagName + '[^>]*>(.*?)<\\/' + tagName + '>', 'i');
  var match = html.match(regExp);
  return match ? match[0] : '';
}

// Detecção aprimorada do tipo de layout
function detectLayoutType(html) {
  // Primeiro verificamos se temos componentes mais complexos
  if (html.includes('<q-layout')) {
    if (html.includes('<q-drawer') && html.includes('<q-header')) {
      return 'app-layout-with-drawer';
    } else if (html.includes('<q-header')) {
      return 'app-layout';
    }
    return 'basic-layout';
  }
  
  if (html.includes('<q-page')) {
    return 'page-only';
  }
  
  if (html.includes('<q-tabs')) {
    return 'tabs-layout';
  }
  
  // Depois verificamos componentes individuais
  // A ordem é importante: Card é mais prioritário que botão
  if (html.includes('<q-card')) {
    return 'card-layout';
  }
  
  if (html.includes('<q-btn')) {
    return 'component-only';
  }
  
  if (html.includes('<q-input') || html.includes('<q-checkbox') || 
      html.includes('<q-select') || html.includes('<q-radio') ||
      html.includes('<q-toggle')) {
    return 'form-component';
  }
  
  if (html.includes('<q-list')) {
    return 'list-layout';
  }
  
  return 'unknown';
}


// Gerar estrutura do componente
function generateComponentStructure(node, depth) {
  depth = depth || 0;
  var indent = '';
  for (var i = 0; i < depth; i++) {
    indent += '  ';
  }
  var result = indent + node.name + "\n";
  
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      result += generateComponentStructure(node.children[i], depth + 1);
    }
  }
  
  return result;
}

// Aplicar propriedades de um componente do mapa
function applyComponentProperties(figmaNode, componentType) {
  if (!quasarComponentMap[componentType]) {
    console.warn('Tipo de componente não encontrado no mapa:', componentType);
    return;
  }
  
  var props = quasarComponentMap[componentType].properties;
  Object.keys(props).forEach(function(key) {
    figmaNode[key] = props[key];
  });
  
  return figmaNode;
}

// Criar texto para um componente
async function createText(content, options) {
  options = options || {};
  
  var textNode = figma.createText();
  textNode.characters = content || '';
  
  // Configurações padrão
  textNode.fontSize = options.fontSize || 14;
  
  if (options.color) {
    textNode.fills = [{ type: 'SOLID', color: options.color }];
  }
  
  if (options.alignment) {
    textNode.textAlignHorizontal = options.alignment;
  }
  
  if (options.verticalAlignment) {
    textNode.textAlignVertical = options.verticalAlignment;
  }
  
  return textNode;
}

// Criar um retângulo ou quadrado
function createRectangle(width, height, options) {
  options = options || {};
  
  var rect = figma.createRectangle();
  rect.resize(width || 100, height || 100);
  
  if (options.color) {
    rect.fills = [{ type: 'SOLID', color: options.color }];
  }
  
  if (options.cornerRadius !== undefined) {
    rect.cornerRadius = options.cornerRadius;
  }
  
  if (options.stroke) {
    rect.strokes = [{ type: 'SOLID', color: options.stroke }];
    rect.strokeWeight = options.strokeWeight || 1;
  }
  
  return rect;
}

// Criar um círculo
function createCircle(diameter, options) {
  options = options || {};
  
  var circle = figma.createEllipse();
  circle.resize(diameter || 20, diameter || 20);
  
  if (options.color) {
    circle.fills = [{ type: 'SOLID', color: options.color }];
  }
  
  if (options.stroke) {
    circle.strokes = [{ type: 'SOLID', color: options.stroke }];
    circle.strokeWeight = options.strokeWeight || 1;
  }
  
  return circle;
}
// Criar um botão Quasar
async function createQuasarButton(html) {
  var buttonFrame = figma.createFrame();
  buttonFrame.name = "q-btn";
  
  // Aplicar propriedades do botão
  applyComponentProperties(buttonFrame, 'q-btn');
  
  // Verificar se há um atributo de cor
  var colorAttr = extractAttribute(html, 'color');
  if (colorAttr && quasarColors[colorAttr]) {
    buttonFrame.fills = [{ type: 'SOLID', color: quasarColors[colorAttr] }];
  }
  
  // Extrair o texto do label, se houver
  var labelMatch = html.match(/label="([^"]+)"/);
  if (labelMatch) {
    var textNode = await createText(labelMatch[1], {
      color: { r: 1, g: 1, b: 1 },
      alignment: 'CENTER',
      verticalAlignment: 'CENTER'
    });
    buttonFrame.appendChild(textNode);
  } else {
    // Verificar se há conteúdo interno do botão
    var btnContent = html.match(/<q-btn[^>]*>([\s\S]*?)<\/q-btn>/);
    if (btnContent && btnContent[1] && btnContent[1].trim()) {
      // Limpar tags HTML para obter apenas o texto
      var cleanContent = btnContent[1].replace(/<[^>]*>/g, ' ').trim();
      if (cleanContent) {
        var textNode = await createText(cleanContent.substring(0, 50), {
          color: { r: 1, g: 1, b: 1 },
          alignment: 'CENTER',
          verticalAlignment: 'CENTER'
        });
        buttonFrame.appendChild(textNode);
      } else {
        // Se não conseguir extrair o texto, usar genérico
        var textNode = await createText("Botão", {
          color: { r: 1, g: 1, b: 1 },
          alignment: 'CENTER',
          verticalAlignment: 'CENTER'
        });
        buttonFrame.appendChild(textNode);
      }
    } else {
      // Se não houver conteúdo, usar texto genérico
      var textNode = await createText("Botão", {
        color: { r: 1, g: 1, b: 1 },
        alignment: 'CENTER',
        verticalAlignment: 'CENTER'
      });
      buttonFrame.appendChild(textNode);
    }
  }
  
  // Verificar flat, outline, round
  if (html.includes('flat') || extractAttribute(html, 'flat') === 'true') {
    buttonFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0 } }];
    // Atualizar cor do texto para a cor do botão
    if (buttonFrame.children.length > 0 && buttonFrame.children[0].type === 'TEXT') {
      var colorValue = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
      buttonFrame.children[0].fills = [{ type: 'SOLID', color: colorValue }];
    }
  }
  
  if (html.includes('outline') || extractAttribute(html, 'outline') === 'true') {
    buttonFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    var colorValue = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
    buttonFrame.strokes = [{ type: 'SOLID', color: colorValue }];
    buttonFrame.strokeWeight = 1;
    // Atualizar cor do texto para a cor do botão
    if (buttonFrame.children.length > 0 && buttonFrame.children[0].type === 'TEXT') {
      buttonFrame.children[0].fills = [{ type: 'SOLID', color: colorValue }];
    }
  }
  
  if (html.includes('round') || extractAttribute(html, 'round') === 'true') {
    buttonFrame.cornerRadius = 999; // Valor alto para cantos completamente arredondados
  }
  
  return buttonFrame;
}

// Criar um card Quasar
async function createQuasarCard(html) {
  var cardFrame = figma.createFrame();
  cardFrame.name = "q-card";
  
  // Aplicar propriedades do card
  applyComponentProperties(cardFrame, 'q-card');
  
  // Verificar se há um atributo de cor para o card
  var colorAttr = extractAttribute(html, 'color');
  if (colorAttr && quasarColors[colorAttr]) {
    cardFrame.fills = [{ type: 'SOLID', color: quasarColors[colorAttr] }];
  }
  
  // Verificar se há uma classe bg-* para a cor do card
  var bgClassMatch = html.match(/class="[^"]*\bbg-([a-z]+)\b/);
  if (bgClassMatch && bgClassMatch[1] && quasarColors[bgClassMatch[1]]) {
    cardFrame.fills = [{ type: 'SOLID', color: quasarColors[bgClassMatch[1]] }];
  }
  
  // Verificar se o código contém q-card-section
  if (html.includes('<q-card-section')) {
    // Pode haver múltiplas seções de card
    var cardSectionMatches = html.match(/<q-card-section[^>]*>[\s\S]*?<\/q-card-section>/g);
    
    if (cardSectionMatches && cardSectionMatches.length > 0) {
      for (var i = 0; i < cardSectionMatches.length; i++) {
        await addCardSection(cardFrame, cardSectionMatches[i]);
      }
    } else {
      // Se não houver match específico mas existe a tag, criar uma seção genérica
      var cardSectionFrame = figma.createFrame();
      cardSectionFrame.name = "q-card-section";
      applyComponentProperties(cardSectionFrame, 'q-card-section');
      
      // Adicionar texto de exemplo
      var textNode = await createText("Conteúdo da Seção");
      cardSectionFrame.appendChild(textNode);
      
      // Adicionar a seção ao card
      cardFrame.appendChild(cardSectionFrame);
    }
  } else {
    // Se não houver q-card-section, adicionar texto genérico
    var textNode = await createText("Conteúdo do Card");
    cardFrame.appendChild(textNode);
  }
  
  // Verificar se tem card-actions
  if (html.includes('<q-card-actions')) {
    await addCardActions(cardFrame, html);
  }
  
  return cardFrame;
}

// Adicionar uma seção de card
async function addCardSection(cardFrame, sectionHtml) {
  var cardSectionFrame = figma.createFrame();
  cardSectionFrame.name = "q-card-section";
  
  // Aplicar propriedades da seção do card
  applyComponentProperties(cardSectionFrame, 'q-card-section');
  
  // Verificar se há um atributo de cor para a seção do card
  var sectionColorAttr = extractAttribute(sectionHtml, 'color');
  if (sectionColorAttr && quasarColors[sectionColorAttr]) {
    cardSectionFrame.fills = [{ type: 'SOLID', color: quasarColors[sectionColorAttr] }];
  }
  
  // Procurar por título (text-h6)
  if (sectionHtml.includes('text-h6')) {
    var titleText = sectionHtml.match(/<div class="[^"]*text-h6[^"]*"[^>]*>(.*?)<\/div>/);
    if (titleText && titleText[1]) {
      var titleNode = await createText(titleText[1].trim(), { fontSize: 18 });
      cardSectionFrame.appendChild(titleNode);
    }
  }
  
  // Procurar por subtítulo (text-subtitle2)
  if (sectionHtml.includes('text-subtitle2')) {
    var subtitleText = sectionHtml.match(/<div class="[^"]*text-subtitle2[^"]*"[^>]*>(.*?)<\/div>/);
    if (subtitleText && subtitleText[1]) {
      var subtitleNode = await createText(subtitleText[1].trim(), {
        fontSize: 14,
        color: { r: 0.4, g: 0.4, b: 0.4 }
      });
      cardSectionFrame.appendChild(subtitleNode);
    }
  }
  
  // Adicionar a seção ao card
  cardFrame.appendChild(cardSectionFrame);
}

// Adicionar ações ao card
async function addCardActions(cardFrame, html) {
  console.log('Processando ações do card');
  
  // Extrair a seção q-card-actions completa
  var actionsMatch = html.match(/<q-card-actions[^>]*>([\s\S]*?)<\/q-card-actions>/);
  if (!actionsMatch || !actionsMatch[1]) {
    console.log('Não foi possível extrair o conteúdo de q-card-actions');
    return;
  }
  
  var cardActionsFrame = figma.createFrame();
  cardActionsFrame.name = "q-card-actions";
  
  // Extrair o conteúdo das ações
  var actionsContent = actionsMatch[1].trim();
  console.log('Conteúdo das ações:', actionsContent);
  
  // Extrair tag de abertura
  var actionsOpenTag = html.match(/<q-card-actions[^>]*>/);
  var actionsOpenTagStr = actionsOpenTag ? actionsOpenTag[0] : '';
  
  // Verificar se as ações são verticais
  var isVertical = actionsOpenTagStr.includes('vertical') || 
                   extractAttribute(actionsOpenTagStr, 'vertical') === 'true';
  
  if (isVertical) {
    cardActionsFrame.layoutMode = "VERTICAL";
    cardActionsFrame.primaryAxisSizingMode = "AUTO";
    cardActionsFrame.counterAxisSizingMode = "AUTO";
    cardActionsFrame.itemSpacing = 8;
  } else {
    // Layout horizontal padrão
    applyComponentProperties(cardActionsFrame, 'q-card-actions');
  }
  
  // Verificar alinhamento
  var align = extractAttribute(actionsOpenTagStr, 'align');
  console.log('Alinhamento das ações:', align);
  
  if (align) {
    if (align === 'right') {
      cardActionsFrame.primaryAxisAlignItems = 'END';
    } else if (align === 'center') {
      cardActionsFrame.primaryAxisAlignItems = 'CENTER';
    } else if (align === 'between') {
      cardActionsFrame.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else if (align === 'around') {
      cardActionsFrame.primaryAxisAlignItems = 'SPACE_AROUND';
    } else if (align === 'evenly') {
      cardActionsFrame.primaryAxisAlignItems = 'SPACE_EVENLY';
    }
  }
  
  // Extrair todos os botões usando regex mais robusta
  var buttonRegex = /<q-btn[^>]*?>(?:[\s\S]*?<\/q-btn>|)/g;
  var buttonMatches = actionsContent.match(buttonRegex);
  
  console.log('Botões encontrados:', buttonMatches ? buttonMatches.length : 0);
  
  // Se encontrou botões, criar cada um deles
  if (buttonMatches && buttonMatches.length > 0) {
    for (var j = 0; j < buttonMatches.length; j++) {
      console.log('Processando botão', j + 1, 'do card');
      var btnHtml = buttonMatches[j];
      
      // Verificar se é um botão auto-fechado
      if (!btnHtml.includes('</q-btn>')) {
        btnHtml = btnHtml.replace(/\/>$/, '></q-btn>');
      }
      
      // Extrair atributos do botão
      var isFlat = btnHtml.includes('flat') || extractAttribute(btnHtml, 'flat') === 'true';
      var btnLabel = extractAttribute(btnHtml, 'label') || 'Action ' + (j + 1);
      var btnColor = extractAttribute(btnHtml, 'color') || 'primary';
      
      // Criar um botão padrão em vez de usar createQuasarButton para evitar problemas
      var actionBtn = figma.createFrame();
      actionBtn.name = "q-btn";
      actionBtn.layoutMode = "HORIZONTAL";
      actionBtn.primaryAxisSizingMode = "AUTO";
      actionBtn.counterAxisSizingMode = "AUTO";
      actionBtn.primaryAxisAlignItems = "CENTER";
      actionBtn.counterAxisAlignItems = "CENTER";
      actionBtn.paddingLeft = 12;
      actionBtn.paddingRight = 12;
      actionBtn.paddingTop = 6;
      actionBtn.paddingBottom = 6;
      
      // Configurar estilo (flat vs normal)
      if (isFlat) {
        actionBtn.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0 } }];
      } else {
        actionBtn.fills = [{ type: 'SOLID', color: quasarColors[btnColor] || quasarColors.primary }];
      }
      
      // Adicionar texto do botão
      var btnText = await createText(btnLabel, {
        color: isFlat ? quasarColors[btnColor] || quasarColors.primary : { r: 1, g: 1, b: 1 },
        alignment: 'CENTER',
        verticalAlignment: 'CENTER'
      });
      
      actionBtn.appendChild(btnText);
      cardActionsFrame.appendChild(actionBtn);
    }
  } else {
    console.log('Nenhum botão encontrado nas ações, criando botões genéricos');
    
    // Se não encontrou botões específicos, criar botões genéricos
    var buttonCount = 2; // Padrão de 2 botões
    
    for (var j = 0; j < buttonCount; j++) {
      var actionBtn = figma.createFrame();
      actionBtn.name = "q-btn";
      actionBtn.layoutMode = "HORIZONTAL";
      actionBtn.primaryAxisSizingMode = "AUTO";
      actionBtn.counterAxisSizingMode = "AUTO";
      actionBtn.primaryAxisAlignItems = "CENTER";
      actionBtn.counterAxisAlignItems = "CENTER";
      actionBtn.paddingLeft = 12;
      actionBtn.paddingRight = 12;
      actionBtn.paddingTop = 6;
      actionBtn.paddingBottom = 6;
      actionBtn.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0 } }]; // Botão flat por padrão
      
      var btnText = await createText("Action " + (j + 1), {
        color: quasarColors.primary,
        alignment: 'CENTER',
        verticalAlignment: 'CENTER'
      });
      actionBtn.appendChild(btnText);
      
      cardActionsFrame.appendChild(actionBtn);
    }
  }
  
  // Adicionar o frame de ações ao card
  cardFrame.appendChild(cardActionsFrame);
  return cardActionsFrame;
}

// Criar um campo de entrada Quasar
async function createQuasarInput(html) {
  var inputFrame = figma.createFrame();
  inputFrame.name = "q-input";
  
  // Aplicar propriedades do input
  applyComponentProperties(inputFrame, 'q-input');
  
  // Verificar se há um atributo de cor
  var colorAttr = extractAttribute(html, 'color');
  if (colorAttr && quasarColors[colorAttr]) {
    // Para input, a cor geralmente é aplicada na borda quando focado
    inputFrame.strokes = [{ type: 'SOLID', color: quasarColors[colorAttr] }];
  }
  
  // Verificar se tem label ou placeholder
  var labelAttr = extractAttribute(html, 'label');
  var placeholderAttr = extractAttribute(html, 'placeholder');
  
  var labelText = labelAttr || placeholderAttr || "Campo de Entrada";
  
  var textNode = await createText(labelText, {
    color: { r: 0.3, g: 0.3, b: 0.3 }
  });
  inputFrame.appendChild(textNode);
  
  return inputFrame;
}

// Criar um checkbox Quasar
async function createQuasarCheckbox(html) {
  var checkboxFrame = figma.createFrame();
  checkboxFrame.name = "q-checkbox";
  
  // Aplicar propriedades do checkbox
  applyComponentProperties(checkboxFrame, 'q-checkbox');
  
  // Criar o box do checkbox
  var boxFrame = figma.createFrame();
  boxFrame.name = "checkbox-box";
  boxFrame.resize(20, 20);
  boxFrame.cornerRadius = 4;
  boxFrame.strokes = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  boxFrame.strokeWeight = 1;
  boxFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Verificar se está marcado
  var isChecked = extractAttribute(html, 'value') === 'true' || 
                  extractAttribute(html, 'checked') === 'true' ||
                  html.includes(':value="true"');
  
  if (isChecked) {
    // Aplicar cor de preenchimento se estiver marcado
    var colorAttr = extractAttribute(html, 'color');
    var checkColor = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
    boxFrame.fills = [{ type: 'SOLID', color: checkColor }];
    
    // Adicionar símbolo de check
    var checkText = await createText("✓", {
      color: { r: 1, g: 1, b: 1 },
      fontSize: 14,
      alignment: 'CENTER',
      verticalAlignment: 'CENTER'
    });
    boxFrame.appendChild(checkText);
  }
  
  checkboxFrame.appendChild(boxFrame);
  
  // Verificar se tem label
  var labelAttr = extractAttribute(html, 'label');
  
  if (labelAttr) {
    var labelNode = await createText(labelAttr, {
      color: { r: 0, g: 0, b: 0 }
    });
    checkboxFrame.appendChild(labelNode);
  }
  
  return checkboxFrame;
}

// Criar um radio button Quasar
async function createQuasarRadio(html) {
  var radioFrame = figma.createFrame();
  radioFrame.name = "q-radio";
  
  // Aplicar propriedades do radio
  applyComponentProperties(radioFrame, 'q-radio');
  
  // Criar o círculo do radio
  var circleFrame = figma.createEllipse();
  circleFrame.name = "radio-circle";
  circleFrame.resize(20, 20);
  circleFrame.strokes = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  circleFrame.strokeWeight = 1;
  circleFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Verificar se está marcado
  var isChecked = extractAttribute(html, 'value') === 'true' || 
                  html.includes(':value="true"');
  
  if (isChecked) {
    // Aplicar cor de borda se estiver marcado
    var colorAttr = extractAttribute(html, 'color');
    var radioColor = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
    circleFrame.strokes = [{ type: 'SOLID', color: radioColor }];
    
    // Adicionar círculo interno
    var innerCircle = figma.createEllipse();
    innerCircle.name = "radio-dot";
    innerCircle.resize(10, 10);
    innerCircle.x = 5;
    innerCircle.y = 5;
    innerCircle.fills = [{ type: 'SOLID', color: radioColor }];
    circleFrame.appendChild(innerCircle);
  }
  
  radioFrame.appendChild(circleFrame);
  
  // Verificar se tem label
  var labelAttr = extractAttribute(html, 'label');
  
  if (labelAttr) {
    var labelNode = await createText(labelAttr, {
      color: { r: 0, g: 0, b: 0 }
    });
    radioFrame.appendChild(labelNode);
  }
  
  return radioFrame;
}

// Criar um toggle switch Quasar
async function createQuasarToggle(html) {
  var toggleFrame = figma.createFrame();
  toggleFrame.name = "q-toggle";
  
  // Aplicar propriedades do toggle
  applyComponentProperties(toggleFrame, 'q-toggle');
  
  // Criar o track do toggle
  var trackFrame = figma.createFrame();
  trackFrame.name = "toggle-track";
  trackFrame.resize(40, 20);
  trackFrame.cornerRadius = 10;
  trackFrame.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
  
  // Verificar se está ativado
  var isActive = extractAttribute(html, 'value') === 'true' ||
                 extractAttribute(html, 'active') === 'true' ||
                 html.includes(':value="true"');
  
  var colorAttr = extractAttribute(html, 'color');
  var toggleColor = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
  
  if (isActive) {
    // Aplicar cor se estiver ativado
    trackFrame.fills = [{ type: 'SOLID', color: toggleColor }];
  }
  
  // Criar o thumb/knob do toggle
  var thumbFrame = figma.createEllipse();
  thumbFrame.name = "toggle-thumb";
  thumbFrame.resize(16, 16);
  thumbFrame.y = 2;
  thumbFrame.x = isActive ? 22 : 2; // Posição baseada no estado
  thumbFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  thumbFrame.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 1 },
      radius: 2,
      visible: true,
      blendMode: 'NORMAL'
    }
  ];
  
  trackFrame.appendChild(thumbFrame);
  toggleFrame.appendChild(trackFrame);
  
  // Verificar se tem label
  var labelAttr = extractAttribute(html, 'label');
  
  if (labelAttr) {
    var labelNode = await createText(labelAttr, {
      color: { r: 0, g: 0, b: 0 }
    });
    toggleFrame.appendChild(labelNode);
  }
  
  return toggleFrame;
}

// Criar um campo de seleção Quasar
async function createQuasarSelect(html) {
  var selectFrame = figma.createFrame();
  selectFrame.name = "q-select";
  
  // Aplicar propriedades do select
  applyComponentProperties(selectFrame, 'q-select');
  
  // Verificar se há um atributo de cor
  var colorAttr = extractAttribute(html, 'color');
  if (colorAttr && quasarColors[colorAttr]) {
    // Para select, a cor geralmente é aplicada na borda quando focado
    selectFrame.strokes = [{ type: 'SOLID', color: quasarColors[colorAttr] }];
  }
  
  // Verificar se tem label ou placeholder
  var labelAttr = extractAttribute(html, 'label');
  var placeholderAttr = extractAttribute(html, 'placeholder');
  
  var labelText = labelAttr || placeholderAttr || "Selecione uma opção";
  
  var textNode = await createText(labelText, {
    color: { r: 0.3, g: 0.3, b: 0.3 }
  });
  
  // Adicionar ícone de dropdown
  var iconFrame = figma.createFrame();
  iconFrame.name = "dropdown-icon";
  iconFrame.resize(24, 24);
  iconFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0 } }];
  
  var iconText = await createText("▼", {
    fontSize: 10,
    color: { r: 0.5, g: 0.5, b: 0.5 },
    alignment: 'CENTER',
    verticalAlignment: 'CENTER'
  });
  
  iconFrame.appendChild(iconText);
  
  selectFrame.appendChild(textNode);
  selectFrame.appendChild(iconFrame);
  
  return selectFrame;
}
// Criar um layout de aplicação
async function createAppLayout(html, hasDrawer) {
  var layoutFrame = figma.createFrame();
  layoutFrame.name = "q-layout";
  
  // Aplicar propriedades do layout
  applyComponentProperties(layoutFrame, 'q-layout');
  
  // Adicionar header, se presente
  if (html.includes('<q-header')) {
    var headerFrame = await createHeader(html);
    layoutFrame.appendChild(headerFrame);
  }
  
  // Se tiver drawer, criar layout com drawer + página
  if (hasDrawer) {
    var contentContainer = await createContentWithDrawer(html);
    layoutFrame.appendChild(contentContainer);
  } else {
    // Senão, criar apenas página
    var pageFrame = await createPage(html);
    layoutFrame.appendChild(pageFrame);
  }
  
  // Adicionar footer, se presente
  if (html.includes('<q-footer')) {
    var footerFrame = await createFooter(html);
    layoutFrame.appendChild(footerFrame);
  }
  
  return layoutFrame;
}

// Criar o header
async function createHeader(html) {
  var headerFrame = figma.createFrame();
  headerFrame.name = "q-header";
  
  // Aplicar propriedades do header
  applyComponentProperties(headerFrame, 'q-header');
  
  // Verificar se há um atributo de cor para o header
  var headerHtml = extractTag(html, 'q-header');
  var headerColorAttr = extractAttribute(headerHtml, 'color');
  if (headerColorAttr && quasarColors[headerColorAttr]) {
    headerFrame.fills = [{ type: 'SOLID', color: quasarColors[headerColorAttr] }];
  }
  
  // Verificar se contém uma toolbar
  if (html.includes('<q-toolbar')) {
    var toolbarFrame = figma.createFrame();
    toolbarFrame.name = "q-toolbar";
    
    // Aplicar propriedades da toolbar
    applyComponentProperties(toolbarFrame, 'q-toolbar');
    
    // Titulo
    var titleNode = await createText("App Title", {
      color: { r: 1, g: 1, b: 1 },
      fontSize: 18
    });
    toolbarFrame.appendChild(titleNode);
    
    // Botões de ação
    var actionsFrame = figma.createFrame();
    actionsFrame.name = "toolbar-actions";
    actionsFrame.layoutMode = "HORIZONTAL";
    actionsFrame.primaryAxisSizingMode = "AUTO";
    actionsFrame.counterAxisSizingMode = "AUTO";
    actionsFrame.itemSpacing = 8;
    actionsFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 0 } }];
    
    // Adicionar um botão de menu
    var menuButton = figma.createFrame();
    menuButton.name = "menu-button";
    menuButton.layoutMode = "HORIZONTAL";
    menuButton.primaryAxisSizingMode = "AUTO";
    menuButton.counterAxisSizingMode = "AUTO";
    menuButton.primaryAxisAlignItems = "CENTER";
    menuButton.counterAxisAlignItems = "CENTER";
    menuButton.paddingLeft = 8;
    menuButton.paddingRight = 8;
    menuButton.paddingTop = 8;
    menuButton.paddingBottom = 8;
    menuButton.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 0 } }];
    
    var menuIcon = await createText("≡", {
      fontSize: 20,
      color: { r: 1, g: 1, b: 1 },
      alignment: 'CENTER',
      verticalAlignment: 'CENTER'
    });
    menuButton.appendChild(menuIcon);
    
    actionsFrame.appendChild(menuButton);
    toolbarFrame.appendChild(actionsFrame);
    
    headerFrame.appendChild(toolbarFrame);
  } else {
    // Adicionar título simples
    var headerText = await createText("App Header", {
      color: { r: 1, g: 1, b: 1 },
      fontSize: 18
    });
    headerFrame.appendChild(headerText);
  }
  
  return headerFrame;
}

// Criar footer
async function createFooter(html) {
  var footerFrame = figma.createFrame();
  footerFrame.name = "q-footer";
  
  // Aplicar propriedades do footer
  applyComponentProperties(footerFrame, 'q-footer');
  
  // Verificar se há um atributo de cor para o footer
  var footerHtml = extractTag(html, 'q-footer');
  var footerColorAttr = extractAttribute(footerHtml, 'color');
  if (footerColorAttr && quasarColors[footerColorAttr]) {
    footerFrame.fills = [{ type: 'SOLID', color: quasarColors[footerColorAttr] }];
  }
  
  // Adicionar texto ao footer
  var footerText = await createText("© 2025 My App", {
    color: { r: 1, g: 1, b: 1 }
  });
  footerFrame.appendChild(footerText);
  
  return footerFrame;
}

// Criar conteúdo com drawer
async function createContentWithDrawer(html) {
  // Criar container para page + drawer
  var contentContainer = figma.createFrame();
  contentContainer.name = "content-container";
  contentContainer.layoutMode = "HORIZONTAL";
  contentContainer.primaryAxisSizingMode = "FIXED";
  contentContainer.counterAxisSizingMode = "FIXED";
  contentContainer.width = 1024;
  contentContainer.height = 700; // Altura ajustada para excluir header/footer
  contentContainer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  contentContainer.itemSpacing = 0;
  
  // Criar drawer
  var drawerFrame = await createDrawer(html);
  contentContainer.appendChild(drawerFrame);
  
  // Criar página
  var pageFrame = await createPage(html, 768); // Largura ajustada para caber com o drawer
  contentContainer.appendChild(pageFrame);
  
  return contentContainer;
}

// Criar drawer
async function createDrawer(html) {
  var drawerFrame = figma.createFrame();
  drawerFrame.name = "q-drawer";
  
  // Aplicar propriedades do drawer
  applyComponentProperties(drawerFrame, 'q-drawer');
  drawerFrame.height = 700; // Ajustar altura para combinar com o container
  
  // Verificar se há um atributo de cor para o drawer
  var drawerHtml = extractTag(html, 'q-drawer');
  var drawerColorAttr = extractAttribute(drawerHtml, 'color');
  if (drawerColorAttr && quasarColors[drawerColorAttr]) {
    drawerFrame.fills = [{ type: 'SOLID', color: quasarColors[drawerColorAttr] }];
  }
  
  // Adicionar lista ao drawer
  var listFrame = figma.createFrame();
  listFrame.name = "q-list";
  listFrame.layoutMode = "VERTICAL";
  listFrame.primaryAxisSizingMode = "AUTO";
  listFrame.counterAxisSizingMode = "FIXED";
  listFrame.width = 256;
  listFrame.itemSpacing = 0;
  listFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Adicionar alguns itens de menu de exemplo
  var menuItems = ["Home", "Perfil", "Configurações", "Sobre"];
  
  for (var i = 0; i < menuItems.length; i++) {
    var itemFrame = figma.createFrame();
    itemFrame.name = "q-item";
    itemFrame.layoutMode = "HORIZONTAL";
    itemFrame.primaryAxisSizingMode = "FIXED";
    itemFrame.counterAxisSizingMode = "AUTO";
    itemFrame.width = 256;
    itemFrame.paddingLeft = 16;
    itemFrame.paddingRight = 16;
    itemFrame.paddingTop = 12;
    itemFrame.paddingBottom = 12;
    itemFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
    itemFrame.counterAxisAlignItems = "CENTER";
    itemFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    
    var textNode = await createText(menuItems[i], {
      color: { r: 0, g: 0, b: 0 }
    });
    itemFrame.appendChild(textNode);
    listFrame.appendChild(itemFrame);
  }
  
  drawerFrame.appendChild(listFrame);
  return drawerFrame;
}

// Criar página
async function createPage(html, width) {
  width = width || 1024;
  
  var pageFrame = figma.createFrame();
  pageFrame.name = "q-page";
  
  // Propriedades padrão da página
  pageFrame.layoutMode = "VERTICAL";
  pageFrame.primaryAxisSizingMode = "AUTO";
  pageFrame.counterAxisSizingMode = "FIXED";
  pageFrame.width = width;
  pageFrame.paddingLeft = 24;
  pageFrame.paddingRight = 24;
  pageFrame.paddingTop = 24;
  pageFrame.paddingBottom = 24;
  pageFrame.itemSpacing = 16;
  pageFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Verificar se tem cards na página
  if (html.includes('<q-card')) {
    // Se tiver cards na página, criar alguns cards de exemplo
    for (var i = 0; i < 2; i++) {
      var cardHtml = '<q-card><q-card-section><div class="text-h6">Card ' + (i + 1) + '</div>' +
                     '<div class="text-subtitle2">Exemplo de conteúdo</div></q-card-section></q-card>';
      var cardClone = await createQuasarCard(cardHtml);
      pageFrame.appendChild(cardClone);
    }
  } else if (html.includes('<q-btn')) {
    // Se tiver botões na página, criar alguns botões de exemplo
    for (var i = 0; i < 2; i++) {
      var btnHtml = '<q-btn label="Botão ' + (i + 1) + '" />';
      var btnClone = await createQuasarButton(btnHtml);
      pageFrame.appendChild(btnClone);
    }
  } else {
    // Adicionar conteúdo de exemplo na página
    var pageContentText = await createText("Conteúdo da Página", {
      fontSize: 16
    });
    pageFrame.appendChild(pageContentText);
  }
  
  return pageFrame;
}

// Criar layout de tabs
async function createTabsLayout(html) {
  var tabsContainer = figma.createFrame();
  tabsContainer.name = "tabs-container";
  tabsContainer.layoutMode = "VERTICAL";
  tabsContainer.primaryAxisSizingMode = "AUTO";
  tabsContainer.counterAxisSizingMode = "FIXED";
  tabsContainer.width = 400;
  tabsContainer.itemSpacing = 0;
  tabsContainer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Criar tabs
  var tabsFrame = figma.createFrame();
  tabsFrame.name = "q-tabs";
  
  // Aplicar propriedades de tabs
  applyComponentProperties(tabsFrame, 'q-tabs');
  tabsFrame.width = 400;
  
  // Adicionar algumas tabs de exemplo
  var tabTitles = ["Tab 1", "Tab 2", "Tab 3"];
  
  for (var i = 0; i < tabTitles.length; i++) {
    var tabFrame = figma.createFrame();
    tabFrame.name = "q-tab";
    tabFrame.layoutMode = "HORIZONTAL";
    tabFrame.primaryAxisSizingMode = "FIXED";
    tabFrame.counterAxisSizingMode = "AUTO";
    tabFrame.width = 400 / tabTitles.length;
    tabFrame.paddingLeft = 16;
    tabFrame.paddingRight = 16;
    tabFrame.paddingTop = 12;
    tabFrame.paddingBottom = 12;
    tabFrame.primaryAxisAlignItems = "CENTER";
    tabFrame.counterAxisAlignItems = "CENTER";
    tabFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    
    // Primeira tab ativa
    if (i === 0) {
      tabFrame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
      tabFrame.strokes = [{type: 'SOLID', color: quasarColors.primary}];
      tabFrame.strokeBottomWeight = 2;
    }
    
    var tabTextNode = await createText(tabTitles[i]);
    tabFrame.appendChild(tabTextNode);
    tabsFrame.appendChild(tabFrame);
  }
  
  tabsContainer.appendChild(tabsFrame);
  
  // Criar painel de tab
  var tabPanelFrame = figma.createFrame();
  tabPanelFrame.name = "q-tab-panel";
  
  // Aplicar propriedades do painel de tab
  applyComponentProperties(tabPanelFrame, 'q-tab-panel');
  tabPanelFrame.width = 400;
  
  // Adicionar conteúdo ao painel de tab
  var tabContentText = await createText("Conteúdo da Tab 1", {
    fontSize: 14
  });
  tabPanelFrame.appendChild(tabContentText);
  
  tabsContainer.appendChild(tabPanelFrame);
  
  return tabsContainer;
}
// Implementação de conversão principal
async function convertQuasarToFigma(code) {
  console.log('Iniciando conversão do código Quasar');
  
  // Extrair o HTML do template
  var templateHtml = extractTemplateContent(code);
  console.log('Template HTML extraído:', templateHtml);
  
  // Extrair o nome do componente
  var componentName = extractComponentName(code);
  console.log('Nome do componente:', componentName);
  
  // Detectar tipo de layout
  var layoutType = detectLayoutType(templateHtml);
  console.log('Tipo de layout detectado:', layoutType);
  
  // Criar um frame para o componente
  var mainFrame = figma.createFrame();
  mainFrame.name = componentName;
  mainFrame.layoutMode = "VERTICAL";
  mainFrame.primaryAxisSizingMode = "AUTO";
  mainFrame.counterAxisSizingMode = "AUTO";
  mainFrame.paddingLeft = 20;
  mainFrame.paddingRight = 20;
  mainFrame.paddingTop = 20;
  mainFrame.paddingBottom = 20;
  mainFrame.itemSpacing = 10;
  
  try {
    // Carregar apenas a fonte padrão
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    
    // ----- Processamento de componentes baseado no tipo de layout -----
    
    switch (layoutType) {
      case 'component-only':
        // Quando o componente principal é um botão
        if (templateHtml.includes('<q-btn')) {
          console.log('Processando botão como componente único');
          var buttonFrame = await createQuasarButton(templateHtml);
          mainFrame.appendChild(buttonFrame);
        }
        break;
        
      case 'card-layout':
        // Quando o componente principal é um card
        console.log('Processando layout de card');
        var cardFrame = await createQuasarCard(templateHtml);
        mainFrame.appendChild(cardFrame);
        
        // Verificamos explicitamente se há um container pai (div) para preservar a estrutura
        var containerMatch = templateHtml.match(/<div[^>]*class="[^"]*q-pa-md[^"]*"[^>]*>/);
        if (containerMatch) {
          // Se tiver um container de padding, aplicamos esse padding ao mainFrame
          mainFrame.paddingLeft = 16;
          mainFrame.paddingRight = 16;
          mainFrame.paddingTop = 16;
          mainFrame.paddingBottom = 16;
        }
        break;
        
      case 'form-component':
        // Componentes de formulário
        console.log('Processando componentes de formulário');
        
        if (templateHtml.includes('<q-input')) {
          var inputFrame = await createQuasarInput(templateHtml);
          mainFrame.appendChild(inputFrame);
        }
        
        if (templateHtml.includes('<q-checkbox')) {
          var checkboxFrame = await createQuasarCheckbox(templateHtml);
          mainFrame.appendChild(checkboxFrame);
        }
        
        if (templateHtml.includes('<q-radio')) {
          var radioFrame = await createQuasarRadio(templateHtml);
          mainFrame.appendChild(radioFrame);
        }
        
        if (templateHtml.includes('<q-toggle')) {
          var toggleFrame = await createQuasarToggle(templateHtml);
          mainFrame.appendChild(toggleFrame);
        }
        
        if (templateHtml.includes('<q-select')) {
          var selectFrame = await createQuasarSelect(templateHtml);
          mainFrame.appendChild(selectFrame);
        }
        break;
        
      case 'tabs-layout':
        // Layout de tabs
        console.log('Processando layout de tabs');
        var tabsLayout = await createTabsLayout(templateHtml);
        mainFrame.appendChild(tabsLayout);
        break;
        
      case 'page-only':
        // Apenas uma página
        console.log('Processando layout de página única');
        var pageFrame = await createPage(templateHtml);
        mainFrame.appendChild(pageFrame);
        break;
        
      case 'app-layout':
      case 'basic-layout':
        // Layout de aplicação sem drawer
        console.log('Processando layout de aplicação');
        var layoutFrame = await createAppLayout(templateHtml, false);
        mainFrame.appendChild(layoutFrame);
        break;
        
      case 'app-layout-with-drawer':
        // Layout de aplicação com drawer
        console.log('Processando layout de aplicação com drawer');
        var layoutWithDrawerFrame = await createAppLayout(templateHtml, true);
        mainFrame.appendChild(layoutWithDrawerFrame);
        break;
        
      default:
        // Layout desconhecido, criar algo genérico
        console.log('Tipo de layout não reconhecido, criando layout genérico');
        
        // Tenta processar cards individuais
        if (templateHtml.includes('<q-card')) {
          var cardFrame = await createQuasarCard(templateHtml);
          mainFrame.appendChild(cardFrame);
        }
        // Tenta processar botões individuais (apenas se não estiverem dentro de um card)
        else if (templateHtml.includes('<q-btn') && !templateHtml.includes('<q-card')) {
          var buttonFrame = await createQuasarButton(templateHtml);
          mainFrame.appendChild(buttonFrame);
        }
        // Se não encontrou componentes reconhecidos, adiciona texto informativo
        else if (mainFrame.children.length === 0) {
          var textNode = await createText("Componente Quasar convertido", {
            fontSize: 16
          });
          mainFrame.appendChild(textNode);
          
          var codePreview = await createText(templateHtml.substring(0, 200) + (templateHtml.length > 200 ? '...' : ''), {
            fontSize: 12,
            color: { r: 0.4, g: 0.4, b: 0.4 }
          });
          mainFrame.appendChild(codePreview);
        }
    }
  
    return mainFrame;
  } catch (error) {
    console.error('Erro ao processar componente:', error);
    throw error;
  }
}

// Comunicação com a UI
figma.ui.onmessage = async function(msg) {
  console.log('Mensagem recebida da UI:', msg);
  
  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
  
  if (msg.type === 'convert-code') {
    try {
      // Executar a conversão
      var result = await convertQuasarToFigma(msg.code);
      
      // Gerar representação da estrutura do componente
      var componentStructure = generateComponentStructure(result);
      
      // Notificar a UI sobre o sucesso
      figma.ui.postMessage({
        type: 'conversion-success',
        structure: componentStructure
      });
      
      // Selecionar o nó recém-criado
      figma.currentPage.selection = [result];
      figma.viewport.scrollAndZoomIntoView([result]);
      
    } catch (error) {
      console.error('Erro na conversão:', error);
      
      // Notificar a UI sobre o erro
      figma.ui.postMessage({
        type: 'conversion-error',
        error: error.message || 'Erro desconhecido'
      });
    }
  }
};