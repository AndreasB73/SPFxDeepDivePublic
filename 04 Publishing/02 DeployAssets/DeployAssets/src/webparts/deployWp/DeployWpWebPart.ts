import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DeployWpWebPartStrings';
import DeployWp from './components/DeployWp';
import { IDeployWpProps } from './components/IDeployWpProps';

export interface IDeployWpWebPartProps {
  description: string;
}

export default class DeployWpWebPart extends BaseClientSideWebPart<IDeployWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDeployWpProps > = React.createElement(
      DeployWp,
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
