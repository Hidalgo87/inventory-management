import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.secret
    );
  }

  

  async uploadFile(file: File, userName: string, fileName: string, bucket: string): Promise<string> {
    const { error } = await this.supabase.storage.from(bucket).upload(`${userName}/${fileName}`, file, {
      cacheControl: '3600',
      upsert: true,
    });
    if (error) {
      throw error;
    }

    const { data } = await this.supabase.storage.from(bucket).getPublicUrl(`${userName}/${fileName}`);
    return data.publicUrl;
  }


}
