import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloSpFxReactWebPartStrings';
import HelloSpFxReact from './components/HelloSpFxReact';
import { IHelloSpFxReactProps } from './components/IHelloSpFxReactProps';

export interface IHelloSpFxReactWebPartProps {
  description: string;
}

export default class HelloSpFxReactWebPart extends BaseClientSideWebPart<IHelloSpFxReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelloSpFxReactProps > = React.createElement(
      HelloSpFxReact,
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
