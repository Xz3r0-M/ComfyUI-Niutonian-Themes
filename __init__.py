# Niutonian Node Styles - ComfyUI custom node (frontend-only extension)
# Drop this folder into ComfyUI/custom_nodes/
# Restart ComfyUI to load the web extension.
#
# 注意：这是一个纯前端主题扩展，不包含任何后端节点。
# NODE_CLASS_MAPPINGS 定义为空以满足 ComfyUI 加载器的要求。
# 实际功能通过 WEB_DIRECTORY 中的 JavaScript 实现。

# 空的节点映射以满足 ComfyUI 加载器要求
NODE_CLASS_MAPPINGS = {}

# Web 目录包含前端 JavaScript 代码
WEB_DIRECTORY = "./js"

# 导出所有需要的变量
__all__ = ["NODE_CLASS_MAPPINGS", "WEB_DIRECTORY"]
