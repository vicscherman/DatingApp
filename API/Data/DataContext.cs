using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
            : base(options) { }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<UserLike> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserLike>().HasKey(k => new { k.SourceUserId, k.TargetUserId });
            //user is lisa, she likes paul, peter mary etc
            //one user likes many
            builder
                .Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
            //the target user, how many people like them,
            //what are their user ids
            //for example paul is liked by lisa, but also abigail and juan
            builder
                .Entity<UserLike>()
                .HasOne(s => s.TargetUser)
                .WithMany(l => l.LikedByUsers)
                .HasForeignKey(s => s.TargetUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
