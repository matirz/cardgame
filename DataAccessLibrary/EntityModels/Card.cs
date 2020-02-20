using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Type { get; set; }
        public int Value { get; set; }
    }
}
