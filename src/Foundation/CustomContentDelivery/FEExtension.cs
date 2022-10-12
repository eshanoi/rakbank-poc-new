using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Shell.Web.Mvc.Html;
using EPiServer.Web;
using Foundation.Features.Preview;
using Foundation.Features.Shared;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;

namespace Foundation.CustomContentDelivery
{
    public static class FEExtension
    {
        private static string _buildFile = "build-date.json";
        private static string _reactAssetFolderName = "static";
        private static string _buildFilePath;

        private static IContextModeResolver _contextModeResolver =
            ServiceLocator.Current.GetInstance<IContextModeResolver>();

        private static IWebHostEnvironment _webHostEnvironment =
            ServiceLocator.Current.GetInstance<IWebHostEnvironment>();

        static FEExtension()
        {
            _buildFilePath = $@"{_webHostEnvironment.WebRootPath}\\{_reactAssetFolderName}\\{_buildFile}";
            FEBuildTime = GetFEBuildTime();
        }

        public static string GetBuildVersion()
        {
            return typeof(FEExtension).Assembly.ImageRuntimeVersion;
        }

        public static string FEBuildTime { get; }

        public static string BaseReactPath => $"/{_reactAssetFolderName}";

        public static string GetCssMainFile()
        {
            return $"/{_reactAssetFolderName}/css/main.css?v=${FEBuildTime}";
        }

        public static string GetJsMainFile()
        {
            return $"/{_reactAssetFolderName}/js/main.js?v=${FEBuildTime}";
        }

        public static string GetReactAdditionalData(IContentViewModel<IContent> contentViewModel)
        {
            try
            {
                var isInEditMode = _contextModeResolver.CurrentMode == ContextMode.Edit;
                var contentDisplay = contentViewModel is PreviewModel previewModel
                    ? previewModel.PreviewContent
                    : contentViewModel.CurrentContent;
                var contentLinkId = contentDisplay.ContentLink.ToString();
                var config = new {contentLinkId = contentLinkId, isInEditMode = isInEditMode};
                return JsonConvert.SerializeObject(config);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return "{}";
            }

        }

        //public static HtmlString RenderRequiredContentDeliveryReact(this HtmlHelper helper, IContentViewModel<IContent> contentViewModel)
        //{
        //    var script = helper.Tag("script", "");
        //    var content = new HtmlContentBuilder();
        //    content.Append(@$"window['contentDeliveryReact'] = JSON.parse(`{helper.Raw(FEExtension.GetReactAdditionalData(contentViewModel))}`);");
        //    script.InnerHtml.AppendHtml(content);
        //    var result = new HtmlString();
        //    return script;
        //}


        private static string GetFEBuildTime()
        {
            try
            {
                if (string.IsNullOrWhiteSpace(_buildFilePath))
                {
                    return string.Empty;
                }

                return File.ReadAllText(_buildFilePath);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DateTime.Now.ToString("yy.MM.dd.hh.mm.ss");
            }
            finally
            {

            }
        }
    }
}
