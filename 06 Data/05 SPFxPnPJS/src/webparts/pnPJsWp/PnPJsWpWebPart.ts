import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PnPJsWpWebPart.module.scss';
import * as strings from 'PnPJsWpWebPartStrings';

import pnp, { Web, Logger, LogLevel, ConsoleListener } from "sp-pnp-js";

export interface IPnPJsWpWebPartProps {
  description: string;
}

export default class PnPJsWpWebPartWebPart extends BaseClientSideWebPart<IPnPJsWpWebPartProps> {

  // // https://github.com/SharePoint/PnP-JS-Core/wiki/Using-sp-pnp-js-in-SharePoint-Framework
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {    
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.pnPJsWp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;

      this.getTitle();
  }

  protected getTitle(): void {
    let web = new Web(this.context.pageContext.web.absoluteUrl);
    
    web.select("Title").getAs<{ Title: string }>().then(w => {    
      this.domElement.innerHTML = `Web Title: ${w.Title}`;
    });
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
