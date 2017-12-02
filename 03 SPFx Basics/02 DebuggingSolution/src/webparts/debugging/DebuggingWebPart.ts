import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DebuggingWebPartStrings';
import Debugging from './components/Debugging';
import { IDebuggingProps } from './components/IDebuggingProps';

export interface IDebuggingWebPartProps {
  description: string;
}

export default class DebuggingWebPart extends BaseClientSideWebPart<IDebuggingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDebuggingProps > = React.createElement(
      Debugging,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
