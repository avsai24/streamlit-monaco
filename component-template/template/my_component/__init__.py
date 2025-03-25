import streamlit.components.v1 as components

_monaco_editor = components.declare_component(
    "monaco_editor",
    url="http://localhost:3001"  
)

def monaco_editor(key=None, default_value="print('Hello from CaptenAI')"):
    return _monaco_editor(default=default_value, key=key)