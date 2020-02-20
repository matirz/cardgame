using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessLibrary.EntityModels
{
    public partial class CardDBContext : DbContext
    {
        public CardDBContext()
        {
        }

        public CardDBContext(DbContextOptions<CardDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Card> Cards { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(100);

                entity.Property(e => e.ImageUrl).HasMaxLength(50);

                entity.Property(e => e.Type).HasMaxLength(10);

                entity.Property(e => e.Value);
            });
        }
    }
}
