import streamlit as st
import io
import contextlib
from my_component import monaco_editor

st.title("Monaco Editor in Streamlit")

code = monaco_editor(key="monaco_editor")

run = st.button("Run Code")

if run:
    st.subheader("Output:")
    output = io.StringIO()
   
    with contextlib.redirect_stdout(output):
        try:
            exec(code)
        except Exception as e:
            st.error(f" Error: {e}")
        st.code(output.getvalue())