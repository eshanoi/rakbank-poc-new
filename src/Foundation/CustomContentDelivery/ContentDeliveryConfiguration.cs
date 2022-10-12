using EPiServer.ContentApi.Core.Internal;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.OpenIDConnect;
using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace Foundation.CustomContentDelivery
{
    public static class ContentDeliveryConfigExtension
    {
        public static void CustomContentDeliveryConfig(this IServiceCollection services)
        {
            services.ConfigureContentApiOptions(o =>
            {
                o.EnablePreviewFeatures = true;
                o.IncludeEmptyContentProperties = false;
                o.FlattenPropertyModel = false;
                o.IncludeMasterLanguage = false;

            });

            // Content Delivery API
            services.AddContentDeliveryApi()
                .WithFriendlyUrl()
                .WithSiteBasedCors();

            // OUR CODE  note change this cookie name for your authentication method, now is login user pass of cms, not sso
            services.AddContentDeliveryApi(IdentityConstants.ApplicationScheme, options =>
                {
                    options.SiteDefinitionApiEnabled = true;
                })
                .WithFriendlyUrl()
                .WithSiteBasedCors();

            // Content Delivery Search API
            services.AddContentSearchApi(o =>
            {
                o.MaximumSearchResults = 100;
            });

            // Content Definitions API
            services.AddContentDefinitionsApi(options =>
            {
                // Accept anonymous calls
                options.DisableScopeValidation = true;
            });
            // Content Management
            services.AddContentManagementApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options =>
            {
                // Accept anonymous calls
                options.DisableScopeValidation = true;
            }); 

            // OUR CODE custom service for special content delivery api
            services.InterceptService<DefaultContentConverter, CustomDefaultContentConverter>();
            services.InterceptService<ContentLoaderService, CustomContentLoaderService>();
            services.InterceptService<UrlResolverService, CustomUrlResolverService>();
        }

        private static void InterceptService<T, NewT>(this IServiceCollection services)
            where NewT : class, T
            where T : class
        {
            if (!services.RemoveService<T>())
            {
                return;
            }
            services.AddSingleton<T, NewT>();
        }

        public static bool RemoveService<T>(this IServiceCollection services)
        {
            try
            {
                var existed = services.FirstOrDefault(m => typeof(T).IsAssignableFrom(m.ServiceType));
                if (existed != null)
                {
                    services.Remove(existed);
                }

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

        }
    }
    [InitializableModule]
    public class ContentDeliveryConfiguration : IConfigurableModule
    {
        public void Initialize(InitializationEngine context)
        {
        }

        public void Uninitialize(InitializationEngine context)
        {
        }

        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            //InterceptService<DefaultContentConverter, CustomDefaultContentConverter>(context);
            //InterceptService<ContentLoaderService, CustomContentLoaderService>(context);
            //InterceptService<UrlResolverService, CustomUrlResolverService>(context);
        }


    }
}
