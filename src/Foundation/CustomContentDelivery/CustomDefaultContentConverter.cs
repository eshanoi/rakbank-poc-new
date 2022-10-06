using EPiServer.ContentApi.Core.Internal;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Globalization;
using EPiServer.ServiceLocation;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.CustomContentDelivery;

[ServiceConfiguration(Lifecycle = ServiceInstanceScope.Singleton)]
public class CustomDefaultContentConverter : DefaultContentConverter, IContentConverter
{
    public CustomDefaultContentConverter(
        IContentTypeRepository contentTypeRepository,
        ReflectionService reflectionService,
        IContentModelReferenceConverter contentModelService,
        IContentVersionRepository contentVersionRepository,
        ContentLoaderService contentLoaderService,
        UrlResolverService urlResolverService,
        IPropertyConverterResolver propertyConverterResolver) : base(contentTypeRepository, reflectionService, contentModelService, contentVersionRepository, contentLoaderService, urlResolverService, propertyConverterResolver)
    {
    }
    protected override IDictionary<string, object> ExtractCustomProperties(IContent content, ConverterContext contentMappingContext)
    {
        var data = base.ExtractCustomProperties(content, contentMappingContext);
        var language = content is ILocalizable localizable
            ? localizable.Language
            : ContentLanguage.PreferredCulture;

        foreach (var (key, value) in data)
        {
            if (value is BlockPropertyModel blockPropertyModel)
            {
                blockPropertyModel.Properties.Add("ComponentType",
                    blockPropertyModel.PropertyDataProperty.PropertyValueType.Name);
                continue;
            }
            if (value is IExpandableProperty expandableProperty && value is IPropertyModel propertyModel)
            {
                var currentValue = propertyModel.GetValueProperty();
                if (currentValue?.Any() != true)
                {
                    continue;
                }

                var expandedValue = propertyModel.GetExpandedValue();
                if (expandedValue == null)
                {
                    expandableProperty.Expand(language);
                }

                expandedValue = propertyModel.GetExpandedValue();
                if (currentValue is IEnumerable<ContentAreaItemModel> areaItemModels && expandedValue?.Any() == true)
                {
                    foreach (var contentApiModel in expandedValue)
                    {
                        var additionalData = areaItemModels.FirstOrDefault(i =>
                            i.ContentLink.Id == contentApiModel.ContentLink.Id);
                        if (additionalData == null)
                        {
                            continue;
                        }
                        contentApiModel.Properties.Add("templateDetail", additionalData);
                    }
                }

                propertyModel.SetValueProperty();
            }
        }

        ContentApiExtension.AddCommonContentDataInformation(data, content);
        return data;
    }
}
