import streamlit as st
from my_component import monaco_editor

st.title("Monaco Editor in Streamlit")

code = monaco_editor(key="monaco_editor")
st.subheader("Code Preview:")
st.code(code, language="javascript")