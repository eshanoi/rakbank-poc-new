using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;

namespace Foundation.CustomContentDelivery
{
    [ServiceConfiguration(Lifecycle = ServiceInstanceScope.Singleton)]
    public class CustomUrlResolverService : UrlResolverService
    {
        private readonly IUrlResolver _urlResolver;
        public CustomUrlResolverService(UrlResolver urlResolver,
            ContentApiOptions contentApiConfiguration) : base(urlResolver, contentApiConfiguration)
        {
            _urlResolver = urlResolver;
        }

        public override string ResolveUrl(ContentReference contentLink, string language, bool forceUseEditHost = false)
        {
            return _urlResolver.GetUrl(contentLink, language, new VirtualPathArguments
            {
                ContextMode = GetContextMode()
            });
        }
        private ContextMode GetContextMode()
        {
            if (ContentApiExtension.ContentApiIsEditingActive())
            {
                return ContextMode.Edit;
            }
            return ContextMode.Default;
        }
    }
}
