import React from "react";
import { Streamlit, withStreamlitConnection, StreamlitComponentBase } from "streamlit-component-lib";
import * as monaco from "monaco-editor";

;(window as any).MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new Worker(new URL("monaco-editor/esm/vs/language/json/json.worker", import.meta.url));
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new Worker(new URL("monaco-editor/esm/vs/language/css/css.worker", import.meta.url));
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new Worker(new URL("monaco-editor/esm/vs/language/html/html.worker", import.meta.url));
    }
    if (label === "typescript" || label === "javascript") {
      return new Worker(new URL("monaco-editor/esm/vs/language/typescript/ts.worker", import.meta.url));
    }
    return new Worker(new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url));
  },
};

class MyComponent extends StreamlitComponentBase {
  editorContainerRef = React.createRef<HTMLDivElement>();
  monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;

  componentDidMount() {
  const container = this.editorContainerRef.current;

  if (container) {
    this.monacoEditor = monaco.editor.create(container, {
      value: this.props.args.default || "// Start coding...",
      language: "python",
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 18,
    });

    this.monacoEditor.onDidChangeModelContent(() => {
      const code = this.monacoEditor!.getValue();
      Streamlit.setComponentValue(code);
    });

    // 
    setTimeout(() => {
      Streamlit.setComponentReady();  
    }, 100); 
  }
}

  render() {
    return (
      <div style={{ height: "600px", border: "1px solid #ccc" }}>
        <div ref={this.editorContainerRef} style={{ height: "100%", width: "100%" }} />
      </div>
    );
  }
}

export default withStreamlitConnection(MyComponent);