export function formatReleaseDate (date){
    return new Date(date).toLocaleDateString('fa-IR',{
      year:"numeric",
      month:"long",
      day : "numeric"
    })
  }