import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';
import { EnvironmentType } from '@microsoft/sp-core-library';
import styles from './SpFxUtitlitesWpWebPart.module.scss';
import * as strings from 'SpFxUtitlitesWpWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';

import { Log } from '@microsoft/sp-core-library';

// import SPModuleLoader from '@microsoft/sp-module-loader';

export interface ISpFxUtitlitesWpWebPartProps {
  description: string;
}

export default class SpFxUtitlitesWpWebPartWebPart extends BaseClientSideWebPart<ISpFxUtitlitesWpWebPartProps> {

  public render(): void {

    //debugger;
    //Page Context
    let ctx = this.context.pageContext;
    console.log(ctx);
    Log.info("Current Site", ctx.site.absoluteUrl);

    const environmentType : string = EnvironmentType.Local ? 'You are in local environment' : 'You are in sharepoint environment';   

    if(this.renderedOnce === false){
      SPComponentLoader.loadScript('/_layouts/15/init.js', {
        globalExportsName: '$_global_init'
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', {
          globalExportsName: 'Sys'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/SP.js', {
          globalExportsName: 'SP'
        });
      })      
    }
   
    this.domElement.innerHTML = `
      <div id='divLoading'></div>
      <div class="${ styles.spFxUtitlitesWp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
              <p class="ms-font-l ms-fontColor-white">${environmentType}</p>
              <button id="showLoading">Show Loading</button>              
              <button id="hideLoading">Hide Loading</button>
            </div>
          </div>
        </div>
      </div>`;

      
    let btnLoader = this.domElement.querySelector('#showLoading').addEventListener("click", ()=> { this.showLoader();})   
    let btnHider = this.domElement.querySelector('#hideLoading').addEventListener("click", ()=> { this.context.statusRenderer.clearLoadingIndicator(this.domElement.querySelector('#divLoading')) ;})   
  }

  protected showLoader(): void {    
    this.context.statusRenderer.displayLoadingIndicator(this.domElement.querySelector('#divLoading'), "This is the Loading incicator");    
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
