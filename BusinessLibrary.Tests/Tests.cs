using BusinessLibrary.Service;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using Xunit;

namespace BusinessLibrary.Tests
{
    public class Tests
    {
        [Fact]
        public void SaveCardTest()
        {            
            var options = new DbContextOptionsBuilder<CardDBContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            using (var context = new CardDBContext(options))
            {
                var service = new SFCardGameService(context);
                var result = service.SaveCard(new Model.CardModel() { Name = "Han Solo", Description = "Han Solo", ImageUrl = "hansolo.jpg", Type = "hero", Value = 90, Id = 1 });
                context.SaveChanges();
            };


            using (var context = new CardDBContext(options))
            {
                Assert.Equal(1, context.Cards.CountAsync().Result);
                Assert.Equal("Han Solo", context.Cards.SingleAsync().Result.Name);
            };
        }

        [Fact]
        public void GetRandomHeroCardTest()
        {         
            var options = new DbContextOptionsBuilder<CardDBContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            using (var context = new CardDBContext(options))
            {
                context.Cards.Add(new Card { Description = "Han Solo", Type = "hero", Name = "Han Solo", Value = 80, ImageUrl = "hansolo.jpg", Id = 1 });
                context.Cards.Add(new Card { Description = "Death Star", Type = "starship", Name = "Death Star", Value = 9000, ImageUrl = "deathstar.hpg", Id = 2 });
                context.SaveChanges();
            };

            using (var context = new CardDBContext(options))
            {
                var service = new SFCardGameService(context);
                var result = service.GetRandomCard("hero");
                Assert.Equal("Han Solo", result.Result.Name);
            }
        }

        [Fact]
        public void GetRandomStarshipCardTest()
        {         
            var options = new DbContextOptionsBuilder<CardDBContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            using (var context = new CardDBContext(options))
            {
                context.Cards.Add(new Card { Description = "Han Solo", Type = "hero", Name = "Han Solo", Value = 80, ImageUrl = "hansolo.jpg", Id = 1 });
                context.Cards.Add(new Card { Description = "Death Star", Type = "starship", Name = "Death Star", Value = 9000, ImageUrl = "deathstar.hpg", Id = 2 });
                context.SaveChanges();
            };

            using (var context = new CardDBContext(options))
            {
                var service = new SFCardGameService(context);
                var result = service.GetRandomCard("starship");
                Assert.Equal("Death Star", result.Result.Name);
            }
        }

        [Fact]
        public void GetRandomHeroManyHeroesCardTest()
        {           
            var options = new DbContextOptionsBuilder<CardDBContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            using (var context = new CardDBContext(options))
            {
                context.Cards.Add(new Card { Description = "Han Solo", Type = "hero", Name = "Han Solo", Value = 80, ImageUrl = "hansolo.jpg", Id = 1 });
                context.Cards.Add(new Card { Description = "r2d2", Type = "hero", Name = "r2d2", Value = 32, ImageUrl = "r2d2.jpg", Id = 2 });
                context.Cards.Add(new Card { Description = "c3po", Type = "hero", Name = "c3po", Value = 34, ImageUrl = "c3po.jpg", Id = 3 });
                context.SaveChanges();
            };

            using (var context = new CardDBContext(options))
            {
                var service = new SFCardGameService(context);
                var result = service.GetRandomCard("hero");
                Assert.True("Han Solo" == result.Result.Name || "r2d2" == result.Result.Name || "c3po" == result.Result.Name);
            }
        }

        [Fact]
        public void GetRandomHeroManyStarshipsCardTest()
        {           
            var options = new DbContextOptionsBuilder<CardDBContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            using (var context = new CardDBContext(options))
            {
                context.Cards.Add(new Card { Description = "Death Star", Type = "starship", Name = "Death Star", Value = 9000, ImageUrl = "deathstar.jpg", Id = 1 });
                context.Cards.Add(new Card { Description = "Millenium Falcon", Type = "starship", Name = "Millenium Falcon", Value = 6, ImageUrl = "milleniumfalcon.jpg", Id = 2 });
                context.Cards.Add(new Card { Description = "X-wing", Type = "starship", Name = "X-wing", Value = 1, ImageUrl = "xwing.jpg", Id = 3 });
                context.SaveChanges();
            };

            using (var context = new CardDBContext(options))
            {
                var service = new SFCardGameService(context);
                var result = service.GetRandomCard("starship");
                Assert.True("Death Star" == result.Result.Name || "Millenium Falcon" == result.Result.Name || "X-wing" == result.Result.Name);
            }
        }

        [Fact]
        public void GetCardsTest()
        {
            var options = new DbContextOptionsBuilder<CardDBContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            using (var context = new CardDBContext(options))
            {
                context.Cards.Add(new Card { Description = "Han Solo", Type = "hero", Name = "Han Solo", Value = 80, ImageUrl = "hansolo.jpg", Id = 1 });
                context.Cards.Add(new Card { Description = "r2d2", Type = "hero", Name = "r2d2", Value = 32, ImageUrl = "r2d2.jpg", Id = 2 });
                context.Cards.Add(new Card { Description = "c3po", Type = "hero", Name = "c3po", Value = 34, ImageUrl = "c3po.jpg", Id = 3 });
                context.Cards.Add(new Card { Description = "Death Star", Type = "starship", Name = "Death Star", Value = 9000, ImageUrl = "deathstar.jpg", Id = 4 });
                context.Cards.Add(new Card { Description = "Millenium Falcon", Type = "starship", Name = "Millenium Falcon", Value = 6, ImageUrl = "milleniumfalcon.jpg", Id = 5 });
                context.Cards.Add(new Card { Description = "X-wing", Type = "starship", Name = "X-wing", Value = 1, ImageUrl = "xwing.jpg", Id = 6 });
                context.SaveChanges();
            };

            using (var context = new CardDBContext(options))
            {
                var service = new SFCardGameService(context);
                var result = service.GetCards();
                Assert.True(6 == result.Result.Count);
            }
        }

    }
}
