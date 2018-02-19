import * as React from "react";
import gtmParts from "react-google-tag-manager";

interface OwnProps {
  gtmId: string;
  dataLayerName?: string;
  additionalEvents?: any;
  previewVariables?: string;
  scriptId?: string;
}

interface Props extends OwnProps {}

class GoogleTagManager extends React.Component<Props, {}> {
  componentDidMount() {
    const dataLayerName = this.props.dataLayerName || "dataLayer";
    const scriptId = this.props.scriptId || "react-google-tag-manager-gtm";

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId) as any;

      // tslint:disable-next-line:no-eval
      eval(gtmScriptNode.textContent);
    }
  }

  render() {
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || "dataLayer",
      additionalEvents: this.props.additionalEvents || {},
      previewVariables: this.props.previewVariables || false
    });

    return (
      <div>
        <div>
          {gtm.noScriptAsReact()}
        </div>
        <div id={this.props.scriptId || "react-google-tag-manager-gtm"}>
          {gtm.scriptAsReact()}
        </div>
      </div>
    );
  }
}

export default GoogleTagManager;
