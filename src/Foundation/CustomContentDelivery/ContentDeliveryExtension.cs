using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.CustomContentDelivery
{
    public static class ContentApiExtension
    {
        public static T GetValue<T>(this IPropertyModel model, string propertyName) where T : class
        {
            return model.GetType().GetProperty(propertyName)?.GetValue(model) is T value ? value : null;
        }

        public static void SetValue(this IPropertyModel model, string propertyName, object value)
        {
            try
            {
                model.GetType().GetProperty(propertyName)?.SetValue(model, value);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        public static IEnumerable<object> GetValueProperty(this IPropertyModel model)
        {
            return model.GetValue<IEnumerable<object>>("Value");
        }

        public static void SetValueProperty(this IPropertyModel model, object value = null)
        {
            model.SetValue("Value", value);
        }

        public static IEnumerable<ContentApiModel> GetExpandedValue(this IPropertyModel model)
        {
            return model.GetValue<IEnumerable<ContentApiModel>>("ExpandedValue");
        }

        public static void AddCommonContentDataInformation(IDictionary<string, object> data, IContent content)
        {
            data.Add("ComponentType", GetContentTypeById(content.ContentTypeID).Name);
            data.Add("ContentId", content.ContentLink.ID);
        }

        public static ContentType GetContentTypeById(int contentTypeId)
        {
            ContentType contentTypeById = ServiceLocator.Current.GetInstance<IContentTypeRepository>().Load(contentTypeId);
            return contentTypeById;
        }

        public static bool ContentApiIsEditingActive()
        {
            var httpContextAccessor = ServiceLocator.Current.GetInstance<IHttpContextAccessor>();
            string str = httpContextAccessor?.HttpContext?.Request?.Query["epieditmode"].FirstOrDefault<string>();
            return str?.Equals("true", StringComparison.OrdinalIgnoreCase) == true;
        }
    }
}
