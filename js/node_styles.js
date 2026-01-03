// Niutonian Node Styles - Professional ComfyUI Theme
// Non-invasive styling that preserves LiteGraph layout

import { app } from "/scripts/app.js";
import { api } from "/scripts/api.js";

const NS = "niutonian_node_styles";
const STORAGE_KEY = `${NS}.stylePack`;

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE PACKS - Only colors and visual effects, no layout changes
// ═══════════════════════════════════════════════════════════════════════════════

const STYLE_PACKS = {
  modern: {
    name: "Modern Dark",
    node_bg: "#1f1f28",
    node_selected: "#2a2a35",
    node_title_bg: "#16213e",
    node_title_color: "#ffffff",
    border_color: "#3d5a80",
    border_selected: "#ee6c4d",
    shadow_color: "rgba(0,0,0,0.5)",
    shadow_size: 12,
    corner_radius: 8,
    executing_color: "#ee6c4d",
  },
  glass: {
    name: "Glassmorphism", 
    node_bg: "rgba(40,40,55,0.85)",
    node_selected: "rgba(60,60,80,0.9)",
    node_title_bg: "rgba(50,50,70,0.8)",
    node_title_color: "#ffffff",
    border_color: "rgba(255,255,255,0.2)",
    border_selected: "#00d4ff",
    shadow_color: "rgba(0,0,0,0.4)",
    shadow_size: 20,
    corner_radius: 16,
    glass: true,
    executing_color: "#00d4ff",
  },
  neon: {
    name: "Neon Glow",
    node_bg: "#0a0a0a",
    node_selected: "#141414", 
    node_title_bg: "#0f0f0f",
    node_title_color: "#39ff14",
    border_color: "#1a1a1a",
    border_selected: "#ff00ff",
    shadow_color: "rgba(255,0,255,0.5)",
    shadow_size: 30,
    corner_radius: 4,
    glow: true,
    executing_color: "#39ff14",
  },
  minimal: {
    name: "Minimal Clean",
    node_bg: "#2d2d2d",
    node_selected: "#3d3d3d",
    node_title_bg: "#383838",
    node_title_color: "#e0e0e0",
    border_color: "#4a4a4a",
    border_selected: "#ffffff",
    shadow_color: "rgba(0,0,0,0.25)",
    shadow_size: 6,
    corner_radius: 4,
    executing_color: "#ffffff",
  },
  ocean: {
    name: "Ocean Deep",
    node_bg: "#0d1b2a",
    node_selected: "#1b263b",
    node_title_bg: "#1b3a4b",
    node_title_color: "#a9d6e5",
    border_color: "#468faf",
    border_selected: "#61e8e1",
    shadow_color: "rgba(0,50,80,0.4)",
    shadow_size: 15,
    corner_radius: 10,
    executing_color: "#61e8e1",
  },
  sunset: {
    name: "Sunset Warm",
    node_bg: "#2d1b1b",
    node_selected: "#3d2828",
    node_title_bg: "#4a2c2a",
    node_title_color: "#ffd6a5",
    border_color: "#9c4a3b",
    border_selected: "#ff7b54",
    shadow_color: "rgba(80,30,20,0.4)",
    shadow_size: 14,
    corner_radius: 10,
    executing_color: "#ffb347",
  },
  cyberpunk: {
    name: "Cyberpunk",
    node_bg: "#0a0a0f",
    node_selected: "#12121a",
    node_title_bg: "#1a1a25",
    node_title_color: "#00ffff",
    border_color: "#ff00ff",
    border_selected: "#00ffff",
    shadow_color: "rgba(255,0,255,0.5)",
    shadow_size: 20,
    corner_radius: 2,
    glow: true,
    scanlines: true,
    executing_color: "#00ffff",
  },
  forest: {
    name: "Forest Night",
    node_bg: "#1a2f1a",
    node_selected: "#2a4a2a",
    node_title_bg: "#1f3d1f",
    node_title_color: "#c8e6c9",
    border_color: "#2e7d32",
    border_selected: "#81c784",
    shadow_color: "rgba(0,0,0,0.45)",
    shadow_size: 14,
    corner_radius: 8,
    executing_color: "#69f0ae",
  },
  midnight: {
    name: "Midnight Purple",
    node_bg: "#1a1025",
    node_selected: "#2d1b40",
    node_title_bg: "#251538",
    node_title_color: "#e1bee7",
    border_color: "#4a148c",
    border_selected: "#ce93d8",
    shadow_color: "rgba(74,20,140,0.4)",
    shadow_size: 16,
    corner_radius: 10,
    glow: true,
    executing_color: "#ea80fc",
  },
  ember: {
    name: "Ember Glow",
    node_bg: "#1f1410",
    node_selected: "#3d2518",
    node_title_bg: "#2a1a12",
    node_title_color: "#ffccbc",
    border_color: "#bf360c",
    border_selected: "#ff6e40",
    shadow_color: "rgba(191,54,12,0.35)",
    shadow_size: 18,
    corner_radius: 6,
    glow: true,
    executing_color: "#ff9e80",
  },
};

// Node type accent colors
const NODE_ACCENTS = {
  "Load": "#4ecdc4",
  "Checkpoint": "#f7b731",
  "LoRA": "#fed330",
  "CLIP": "#a55eea",
  "VAE": "#20bf6b",
  "KSampler": "#eb3b5a",
  "Sampler": "#fc5c65",
  "ControlNet": "#8854d0",
  "IPAdapter": "#3867d6",
  "Image": "#0fb9b1",
  "Preview": "#2bcbba",
  "Save": "#45aaf2",
  "Latent": "#f368e0",
  "Conditioning": "#a55eea",
  "Encode": "#8854d0",
  "Mask": "#fa8231",
  "default": "#778ca3",
};

function getAccent(node) {
  const type = node?.type || "";
  for (const [key, color] of Object.entries(NODE_ACCENTS)) {
    if (key !== "default" && type.includes(key)) return color;
  }
  return NODE_ACCENTS.default;
}

function getPackId() {
  return localStorage.getItem(STORAGE_KEY) || "modern";
}

function setPackId(id) {
  localStorage.setItem(STORAGE_KEY, id);
}

function getPack() {
  return STYLE_PACKS[getPackId()] || STYLE_PACKS.modern;
}


// ═══════════════════════════════════════════════════════════════════════════════
// APPLY THEME BY MODIFYING LITEGRAPH DEFAULTS (non-invasive)
// ═══════════════════════════════════════════════════════════════════════════════

let applied = false;

function applyTheme() {
  const LiteGraph = globalThis?.LiteGraph;
  const LGraphCanvas = globalThis?.LGraphCanvas;
  const LGraphNode = globalThis?.LGraphNode;
  
  if (!LiteGraph || !LGraphCanvas || applied) return false;
  applied = true;
  
  const pack = getPack();
  
  // Apply to LiteGraph defaults - this affects all nodes without breaking layout
  LiteGraph.NODE_DEFAULT_COLOR = pack.node_bg;
  LiteGraph.NODE_DEFAULT_BGCOLOR = pack.node_bg;
  LiteGraph.NODE_DEFAULT_BOXCOLOR = "#ffffff"; // White box for visibility
  LiteGraph.NODE_TITLE_COLOR = "#ffffff"; // Force white title text for visibility
  LiteGraph.NODE_SELECTED_TITLE_COLOR = "#ffffff"; // Ensure selected title is visible
  LiteGraph.NODE_TEXT_COLOR = "#ffffff"; // White text
  LiteGraph.NODE_DEFAULT_SHAPE = "box";
  
  // Also set the canvas title color
  if (LGraphCanvas.prototype) {
    LGraphCanvas.prototype.node_title_color = "#ffffff";
  }
  
  // Widget colors
  LiteGraph.WIDGET_BGCOLOR = "rgba(0,0,0,0.3)";
  LiteGraph.WIDGET_OUTLINE_COLOR = pack.border_color;
  LiteGraph.WIDGET_TEXT_COLOR = "#ddd";
  LiteGraph.WIDGET_SECONDARY_TEXT_COLOR = "#999";
  
  // Link colors
  LiteGraph.LINK_COLOR = "#9A9";
  LiteGraph.EVENT_LINK_COLOR = "#A86";
  LiteGraph.CONNECTING_LINK_COLOR = "#AFA";
  
  // Override the running stroke style color for all nodes
  // This hooks into ComfyUI's strokeStyles system
  if (LGraphNode && LGraphNode.prototype) {
    const originalOnAdded = LGraphNode.prototype.onAdded;
    LGraphNode.prototype.onAdded = function(graph) {
      if (originalOnAdded) {
        originalOnAdded.call(this, graph);
      }
      // Override the running stroke style to use our theme color
      if (this.strokeStyles && this.strokeStyles['running']) {
        const originalRunning = this.strokeStyles['running'];
        const execColor = getPack().executing_color || "#00ff88";
        this.strokeStyles['running'] = function() {
          const result = originalRunning.call(this);
          if (result) {
            return { color: execColor, lineWidth: 3 };
          }
          return result;
        };
      }
    };
  }
  
  // Override drawTitleBarBackground to NOT draw a separate header
  // This gives a cleaner unified look - the title text will draw on top of our node background
  const originalDrawTitleBarBackground = LGraphNode.prototype.drawTitleBarBackground;
  LGraphNode.prototype.drawTitleBarBackground = function(ctx, options = {}) {
    const pack = getPack();
    const accent = getAccent(this);
    const titleH = options.title_height || LiteGraph.NODE_TITLE_HEIGHT || 30;
    const collapsed = this.flags?.collapsed;
    // Use collapsed width for collapsed nodes
    const w = collapsed ? (this._collapsed_width || LiteGraph.NODE_COLLAPSED_WIDTH || 80) : this.size[0];
    
    // Check if node has manual colors set by user
    const hasManualColor = (this.color && this.color !== LiteGraph.NODE_DEFAULT_COLOR) || 
                          (this.bgcolor && this.bgcolor !== LiteGraph.NODE_DEFAULT_BGCOLOR);
    
    // If node has manual colors, use original drawing
    if (hasManualColor) {
      return originalDrawTitleBarBackground.call(this, ctx, options);
    }
    
    // Skip if transparent or no title
    if (this.title_mode === LiteGraph.TRANSPARENT_TITLE) {
      return;
    }
    
    // For collapsed nodes, we still need to draw the background
    if (collapsed) {
      const r = Math.min(pack.corner_radius, 12);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(0, -titleH, w, titleH, r);
      ctx.fillStyle = pack.node_title_bg;
      if (LiteGraph.DEFAULT_SHADOW_COLOR) {
        ctx.shadowColor = LiteGraph.DEFAULT_SHADOW_COLOR;
      }
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.restore();
      return;
    }
    
    // For non-collapsed: just draw a subtle accent line at the bottom of title area
    // The node background is already drawn by drawNodeShape
    ctx.save();
    ctx.fillStyle = accent;
    ctx.fillRect(0, -2, w, 2);
    ctx.restore();
  };
  
  // Store original drawNodeShape
  const originalDrawNodeShape = LGraphCanvas.prototype.drawNodeShape;
  
  // Override drawNodeShape for custom styling while preserving layout
  LGraphCanvas.prototype.drawNodeShape = function(node, ctx, size, fgcolor, bgcolor, selected, mouse_over) {
    const pack = getPack();
    const accent = getAccent(node);
    
    // Check if node has manual colors set by user
    const hasManualColor = (node.color && node.color !== LiteGraph.NODE_DEFAULT_COLOR) || 
                          (node.bgcolor && node.bgcolor !== LiteGraph.NODE_DEFAULT_BGCOLOR);
    
    // If node has manual colors, use original drawing and skip theme effects
    if (hasManualColor) {
      return originalDrawNodeShape.call(this, node, ctx, size, fgcolor, bgcolor, selected, mouse_over);
    }
    
    // Detect if node is currently executing
    let isExecuting = false;
    try {
      // Check our custom flag first (set by API events)
      if (node.is_executing === true) {
        isExecuting = true;
      }
      // Also check ComfyUI's strokeStyles if available
      if (!isExecuting && node.strokeStyles && typeof node.strokeStyles['running'] === 'function') {
        const runningResult = node.strokeStyles['running'].call(node);
        if (runningResult) {
          isExecuting = true;
        }
      }
    } catch(e) {}
    
    // Get the node's bounding rect (includes title area)
    // LiteGraph draws with body at (0,0) and title at negative Y
    const titleMode = node.title_mode ?? node.constructor.title_mode ?? LiteGraph.NORMAL_TITLE;
    const renderTitle = titleMode !== LiteGraph.TRANSPARENT_TITLE && titleMode !== LiteGraph.NO_TITLE;
    const collapsed = node.flags?.collapsed;
    const titleH = renderTitle ? (LiteGraph.NODE_TITLE_HEIGHT || 30) : 0;
    
    // Body dimensions (what LiteGraph passes as size)
    // For collapsed nodes, use the collapsed width from LiteGraph
    const w = collapsed ? (node._collapsed_width || LiteGraph.NODE_COLLAPSED_WIDTH || 80) : size[0];
    const h = size[1];
    const r = Math.min(pack.corner_radius, 12);
    
    // Full node area including title (title is at negative Y)
    const fullY = renderTitle ? -titleH : 0;
    const fullH = renderTitle ? h + titleH : h;
    
    ctx.save();
    
    // === SHADOW ===
    const execColor = pack.executing_color || "#00ff88";
    if (pack.shadow_size > 0) {
      if (isExecuting) {
        ctx.shadowColor = execColor;
        ctx.shadowBlur = pack.shadow_size * 3;
      } else if (pack.glow && selected) {
        ctx.shadowColor = accent;
        ctx.shadowBlur = pack.shadow_size * 1.5;
      } else {
        ctx.shadowColor = pack.shadow_color;
        ctx.shadowBlur = pack.shadow_size;
      }
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = isExecuting ? 0 : (selected ? 0 : 4);
    }
    
    // === FULL NODE BACKGROUND (title + body) ===
    ctx.beginPath();
    if (collapsed) {
      // Collapsed node - just the title bar
      ctx.roundRect(0, fullY, w, titleH, r);
    } else {
      ctx.roundRect(0, fullY, w, fullH, r);
    }
    if (isExecuting) {
      ctx.fillStyle = pack.node_selected;
    } else {
      ctx.fillStyle = selected ? pack.node_selected : pack.node_bg;
    }
    ctx.fill();
    
    // Clear shadow for rest
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    
    // === GLASS EFFECT ===
    if (pack.glass && !collapsed) {
      const grad = ctx.createLinearGradient(0, fullY, 0, fullY + fullH);
      grad.addColorStop(0, "rgba(255,255,255,0.08)");
      grad.addColorStop(0.3, "rgba(255,255,255,0.02)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(0, fullY, w, fullH, r);
      ctx.fill();
    }

    // Note: Title bar is drawn by drawTitleBarBackground which we override
    // to use our theme colors. We don't draw it here to avoid double-drawing.
    
    // === BORDER ===
    ctx.beginPath();
    if (collapsed) {
      ctx.roundRect(0.5, fullY + 0.5, w - 1, titleH - 1, r);
    } else {
      ctx.roundRect(0.5, fullY + 0.5, w - 1, fullH - 1, r);
    }
    if (isExecuting) {
      ctx.strokeStyle = execColor;
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = selected ? pack.border_selected : pack.border_color;
      ctx.lineWidth = selected ? 2 : 1;
    }
    ctx.stroke();
    
    // === GLOW FOR SELECTED (neon theme) ===
    if (selected && pack.glow && !isExecuting) {
      ctx.shadowColor = pack.border_selected;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.roundRect(0, fullY, w, collapsed ? titleH : fullH, r);
      ctx.strokeStyle = pack.border_selected;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // === EXECUTING GLOW ===
    if (isExecuting) {
      ctx.shadowColor = execColor;
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.roundRect(0, fullY, w, collapsed ? titleH : fullH, r);
      ctx.strokeStyle = execColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // === SCANLINES (cyberpunk theme) ===
    if (pack.scanlines && !collapsed) {
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "#00ffff";
      for (let sy = fullY; sy < fullY + fullH; sy += 3) {
        ctx.fillRect(0, sy, w, 1);
      }
      ctx.restore();
    }
    
    // === PROGRESS BAR (for executing nodes like KSampler) ===
    // Draw at top of body area (Y=0)
    if (node.progress != null && node.progress > 0 && !collapsed) {
      const progressColor = isExecuting ? execColor : accent;
      ctx.save();
      ctx.fillStyle = progressColor;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(0, 0, w * node.progress, 6);
      // Add a subtle glow effect
      ctx.shadowColor = progressColor;
      ctx.shadowBlur = 8;
      ctx.fillRect(0, 0, w * node.progress, 4);
      ctx.restore();
    }
    
    ctx.restore();
    
    // CRITICAL: Call onDrawBackground for image/video previews
    // This is where ComfyUI renders images in Preview/Save nodes
    if (node.onDrawBackground) {
      node.onDrawBackground(ctx);
    }
    
    // Draw title bar, title box, and title text
    // These are normally called by the original drawNodeShape after onDrawBackground
    const shouldRenderTitle = renderTitle; // reuse the variable from above
    
    if (shouldRenderTitle || titleMode === LiteGraph.TRANSPARENT_TITLE) {
      // Draw title bar background (our themed version)
      node.drawTitleBarBackground(ctx, {
        scale: this.ds?.scale || 1,
        low_quality: this.low_quality || false
      });
      
      // Draw title box (collapse button)
      node.drawTitleBox(ctx, {
        scale: this.ds?.scale || 1,
        low_quality: this.low_quality || false,
        box_size: 10
      });
      
      // Draw title text
      node.drawTitleText(ctx, {
        scale: this.ds?.scale || 1,
        default_title_color: this.node_title_color || "#ffffff",
        low_quality: this.low_quality || false
      });
      
      // Custom title render callback
      if (node.onDrawTitle) {
        node.onDrawTitle(ctx);
      }
    }
  };
  
  console.log("[NiutonianNodeStyles] ✨ Theme applied:", pack.name);
  return true;
}

// Re-apply theme when pack changes
function reapplyTheme() {
  const LiteGraph = globalThis?.LiteGraph;
  const LGraphCanvas = globalThis?.LGraphCanvas;
  const pack = getPack();
  
  // Update LiteGraph color constants for the new theme
  if (LiteGraph) {
    LiteGraph.NODE_DEFAULT_COLOR = pack.node_bg;
    LiteGraph.NODE_DEFAULT_BGCOLOR = pack.node_bg;
    LiteGraph.NODE_DEFAULT_BOXCOLOR = "#ffffff";
    LiteGraph.NODE_TITLE_COLOR = "#ffffff"; // Force white for visibility
    LiteGraph.NODE_SELECTED_TITLE_COLOR = "#ffffff";
    LiteGraph.NODE_TEXT_COLOR = "#ffffff";
    LiteGraph.WIDGET_OUTLINE_COLOR = pack.border_color;
  }
  
  // Update canvas title color
  if (LGraphCanvas?.prototype) {
    LGraphCanvas.prototype.node_title_color = "#ffffff";
  }
  
  // Also update the active canvas instance
  if (app.canvas) {
    app.canvas.node_title_color = "#ffffff";
  }
  
  // Force all nodes to recalculate their size to match the new theme
  try {
    if (app.graph && app.graph._nodes) {
      for (const node of app.graph._nodes) {
        // Recalculate the node size based on current content
        const newSize = node.computeSize();
        // Only resize if the new size is larger (don't shrink user-resized nodes)
        if (newSize[0] > node.size[0] || newSize[1] > node.size[1]) {
          node.size[0] = Math.max(node.size[0], newSize[0]);
          node.size[1] = Math.max(node.size[1], newSize[1]);
        }
        // Mark node as dirty to force redraw
        node.setDirtyCanvas(true, true);
      }
    }
  } catch(e) {
    console.warn("[NiutonianNodeStyles] Could not resize nodes:", e);
  }
  
  // Force redraw
  try {
    app.canvas?.setDirty(true, true);
    app.graph?.setDirtyCanvas(true, true);
    globalThis.LGraphCanvas?.active_canvas?.setDirty(true, true);
  } catch(e) {}
}


// ═══════════════════════════════════════════════════════════════════════════════
// MENU
// ═══════════════════════════════════════════════════════════════════════════════

function buildMenu() {
  const currentPack = getPackId();
  return [
    null,
    {
      content: "🎨 Niutonian Theme",
      has_submenu: true,
      submenu: {
        options: Object.entries(STYLE_PACKS).map(([id, pack]) => ({
          content: `${currentPack === id ? "✓ " : "  "}${pack.name}`,
          callback: () => {
            setPackId(id);
            reapplyTheme();
            console.log("[NiutonianNodeStyles] Switched to:", pack.name);
          },
        })),
      },
    },
  ];
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXTENSION
// ═══════════════════════════════════════════════════════════════════════════════

app.registerExtension({
  name: "Niutonian.NodeStyles",
  
  async setup() {
    console.log("[NiutonianNodeStyles] 🚀 Loading...");
    
    if (applyTheme()) return;
    
    // Retry until LiteGraph is ready
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (applyTheme() || attempts >= 50) {
        clearInterval(interval);
      }
    }, 200);
    
    // Keyboard shortcuts (Alt+1 through Alt+0 for 10 themes)
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key >= "0" && e.key <= "9") {
        const packIds = Object.keys(STYLE_PACKS);
        // Alt+1 = index 0, Alt+2 = index 1, ..., Alt+0 = index 9
        const index = e.key === "0" ? 9 : parseInt(e.key) - 1;
        if (index < packIds.length) {
          setPackId(packIds[index]);
          reapplyTheme();
        }
        e.preventDefault();
      }
    });
    
    // Track currently executing node ID
    let currentExecutingNodeId = null;
    
    // Listen for execution events to track running nodes
    api.addEventListener("executing", ({ detail }) => {
      // detail is the node ID (string or null when execution completes)
      currentExecutingNodeId = detail;
      
      if (app.graph && app.graph._nodes) {
        for (const node of app.graph._nodes) {
          // Mark node as executing if its ID matches
          node.is_executing = (detail !== null && String(node.id) === String(detail));
        }
        // Force immediate redraw
        if (app.canvas) {
          app.canvas.setDirty(true, true);
          app.canvas.draw(true, true);
        }
      }
    });
    
    api.addEventListener("executed", ({ detail }) => {
      // Clear execution state for the completed node
      // detail.node contains the node ID that finished
      if (app.graph && app.graph._nodes && detail?.node) {
        for (const node of app.graph._nodes) {
          if (String(node.id) === String(detail.node)) {
            node.is_executing = false;
          }
        }
        if (app.canvas) {
          app.canvas.setDirty(true, true);
        }
      }
    });
    
    api.addEventListener("execution_start", ({ detail }) => {
      // Clear all execution states at start of new prompt
      currentExecutingNodeId = null;
      if (app.graph && app.graph._nodes) {
        for (const node of app.graph._nodes) {
          node.is_executing = false;
        }
      }
    });
    
    api.addEventListener("execution_error", ({ detail }) => {
      // Clear all execution states on error
      currentExecutingNodeId = null;
      if (app.graph && app.graph._nodes) {
        for (const node of app.graph._nodes) {
          node.is_executing = false;
        }
        if (app.canvas) {
          app.canvas.setDirty(true, true);
        }
      }
    });
    
    // Also listen to progress events - these fire during node execution
    api.addEventListener("progress", ({ detail }) => {
      // detail contains: { value, max, prompt_id, node }
      // The 'node' field is the currently executing node ID
      if (detail?.node && app.graph && app.graph._nodes) {
        const execNodeId = String(detail.node);
        for (const node of app.graph._nodes) {
          // Check if this node matches the executing node
          // Handle both simple IDs and execution IDs (with colons for subgraphs)
          const nodeIdStr = String(node.id);
          node.is_executing = (nodeIdStr === execNodeId || execNodeId.endsWith(':' + nodeIdStr));
        }
        if (app.canvas) {
          app.canvas.setDirty(true, true);
        }
      }
    });
  },
});

// Also add to LiteGraph menu
setTimeout(() => {
  const LGC = globalThis?.LGraphCanvas;
  if (LGC) {
    const orig = LGC.prototype.getCanvasMenuOptions;
    LGC.prototype.getCanvasMenuOptions = function() {
      return [...(orig?.call(this) || []), ...buildMenu()];
    };
  }
}, 2000);

export { STYLE_PACKS, getPackId, setPackId };
