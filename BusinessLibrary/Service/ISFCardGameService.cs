using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface ISFCardGameService
    {
        Task<List<CardModel>> GetCards();        

        Task<CardModel> GetRandomCard(string type);

        Task<bool> SaveCard(CardModel card);
    }
}
