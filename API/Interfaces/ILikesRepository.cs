using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);

        Task<AppUser> GetUserWithLikes(int userId);

        //user they liked, or user they're liked by
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);

        
    }
}
