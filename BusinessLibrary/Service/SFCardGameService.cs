using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class SFCardGameService : ISFCardGameService
    {
        private CardDBContext _dbContext;
        public SFCardGameService(CardDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Model.CardModel>> GetCards()
        {
            return await (from a in _dbContext.Cards.AsNoTracking()
                          select new Model.CardModel
                          {
                              Description = a.Description,
                              Id = a.Id,
                              ImageUrl = a.ImageUrl,
                              Name = a.Name,
                              Type = a.Type,
                              Value = a.Value
                          }).ToListAsync();

        }

        public async Task<Model.CardModel> GetRandomCard(string type)
        {
            Random rand = new Random();
            int toSkip = rand.Next(0, _dbContext.Cards.Where(z => z.Type == type).Count());

            return await (from a in _dbContext.Cards.AsNoTracking()
                          where a.Type == type
                          select new Model.CardModel
                          {
                              Description = a.Description,
                              Id = a.Id,
                              ImageUrl = a.ImageUrl,
                              Name = a.Name,
                              Type = a.Type,
                              Value = a.Value
                          }).Skip(toSkip).Take(1).SingleOrDefaultAsync();

        }

        public async Task<bool> SaveCard(CardModel cardModel)
        {

            var card = _dbContext.Cards.Where
                         (x => x.Id == cardModel.Id).FirstOrDefault();
            if (card == null)
            {
                card = new Card()
                {
                    Name = cardModel.Name,
                    Description = cardModel.Description,
                    ImageUrl = cardModel.ImageUrl,
                    Type = cardModel.Type,
                    Value = cardModel.Value
                };
                _dbContext.Cards.Add(card);
            }
            else
            {
                card.Name = cardModel.Name;
                card.Description = cardModel.Description;
                card.ImageUrl = cardModel.ImageUrl;
                card.Type = cardModel.Type;
                card.Value = cardModel.Value;
            }

            return await _dbContext.SaveChangesAsync() >= 1;
        }
    }
}