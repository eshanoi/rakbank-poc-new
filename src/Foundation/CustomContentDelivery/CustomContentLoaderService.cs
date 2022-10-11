using EPiServer;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace Foundation.CustomContentDelivery
{
    [ServiceConfiguration(Lifecycle = ServiceInstanceScope.Singleton)]
    public class CustomContentLoaderService : ContentLoaderService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CustomContentLoaderService(IHttpContextAccessor httpContextAccessor,
            IContentLoader contentLoader,
            IPermanentLinkMapper permanentLinkMapper,
            IContentProviderManager providerManager) : base(contentLoader, permanentLinkMapper, providerManager)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        protected override bool ShouldContentBeExposed(IContent content)
        {
            if (ContentApiExtension.ContentApiIsEditingActive())
            {
                return true;
            }
            return base.ShouldContentBeExposed(content);
        }
    }
}
