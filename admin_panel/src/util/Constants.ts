export const CURRENT_USER = "current_user"


export const toDateObject = (dateString: string): Date => {
    const parts: string[] = dateString.split('/'); // Tarihi bölümlere ayır
    const day: number = parseInt(parts[0]); // Gün
    const month: number = parseInt(parts[1]) - 1; // Ay (0'dan başlayarak)
    const year: number = parseInt(parts[2]); // Yıl

    const dateObject: Date = new Date(year, month, day);

    console.log(dateObject); // Tarih nesnesini yazdır

    return dateObject

}